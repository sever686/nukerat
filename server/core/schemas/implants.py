from typing import Annotated, Literal, Self

from pydantic import BaseModel, Field, model_validator

from schemas.listeners import ResponseHeader

Os = Literal["windows", "linux", "macos"]
Cpu = Literal["amd", "arm"]
Arch = Literal["x64", "x86"]
Format = Literal["exe", "dll", "shellcode", "elf", "so", "app"]
SleepMask = Literal["off", "timer", "zilean"]
PatchToggle = Literal["on", "off"]
StringObfuscation = Literal["off", "xor", "rc4"]
ApiResolution = Literal["dynamic"]
WinApiMethod = Literal["indirect"]
ImplantBodyType = Literal["off", "custom", "json", "xml"]
DonutEntropy = Literal["none", "random", "encrypt"]
DonutCompress = Literal["none", "aplib"]
DonutHeaders = Literal["overwrite", "keep"]
DonutExit = Literal["thread", "process", "block"]
ShellcodeEncoder = Literal["off", "sgn", "supernova"]
StagelessProtocol = Literal["http", "https", "smb", "tcp", "custom"]
LoaderProtocol = Literal["http", "custom"]

_OS_FORMATS: dict[str, set[str]] = {
    "windows": {"exe", "dll", "shellcode"},
    "linux": {"elf", "so"},
    "macos": {"app"},
}

_PE_FORMATS = {"exe", "dll", "shellcode"}
_NIM_FORMATS = {"exe", "dll", "shellcode", "elf", "so", "app"}
_HTTP_PROTOCOLS = {"http", "https"}


class FileAttachment(BaseModel):
    name: str = Field(min_length=1)
    bytes: str = Field(min_length=1)


class PeTimestampRange(BaseModel):
    lo: int
    hi: int


class BodyContent(BaseModel):
    type: ImplantBodyType
    request_body: str | None = None
    response_body: str | None = None
    cookies: list[ResponseHeader] | None = None
    headers: list[ResponseHeader] | None = None

    @model_validator(mode="after")
    def validate_body_fields(self) -> Self:
        # Requires request and response bodies when the body type is on
        if self.type != "off":
            if not (self.request_body or "").strip():
                raise ValueError("body 类型不为 off 时必须填写 request_body")
            if not (self.response_body or "").strip():
                raise ValueError("body 类型不为 off 时必须填写 response_body")
        return self


class ImplantConfigBase(BaseModel):
    operational_system: Os
    cpu: Cpu
    arch: Arch
    format: Format
    servers: dict[str, str] = Field(default_factory=dict)
    sleep: str = "2"
    delay: str = "20"
    second_delay: str = ""
    syscall_method: WinApiMethod = "indirect"
    sleep_mask: SleepMask = "off"
    string_obfuscation: StringObfuscation = "xor"
    etw_patch: PatchToggle = "off"
    amsi_patch: PatchToggle = "off"
    pe_headers_patch: PatchToggle = "off"
    show_conhost: PatchToggle = "off"
    api_resolution: ApiResolution = "dynamic"
    exe_icon: FileAttachment | None = None
    body_content: BodyContent | None = None
    smb_pipe: str | None = None
    custom_channel: str | None = None
    custom_http_relay: str | None = None
    preface: str | None = None
    create_pe_strings: str | None = None
    pe_timestamp: PeTimestampRange | None = None
    pe_major_linker_version: int | None = Field(default=None, ge=0, le=65535)
    pe_minor_linker_version: int | None = Field(default=None, ge=0, le=65535)
    pe_major_os_version: int | None = Field(default=None, ge=0, le=65535)
    pe_minor_os_version: int | None = Field(default=None, ge=0, le=65535)
    pe_major_image_version: int | None = Field(default=None, ge=0, le=65535)
    pe_minor_image_version: int | None = Field(default=None, ge=0, le=65535)
    pe_major_subsystem_version: int | None = Field(default=None, ge=0, le=65535)
    pe_minor_subsystem_version: int | None = Field(default=None, ge=0, le=65535)
    donut_entropy: DonutEntropy | None = None
    donut_compress: DonutCompress | None = None
    donut_headers: DonutHeaders | None = None
    donut_exit: DonutExit | None = None
    donut_thread: bool | None = None
    shellcode_encoder: ShellcodeEncoder | None = None

    @staticmethod
    def _filled_servers(servers: dict[str, str]) -> list[str]:
        # Returns the server values that are not empty
        return [value.strip() for value in servers.values() if str(value).strip()]

    def _validate_os_format_cpu(self) -> None:
        # Checks that the format, cpu and arch match the system
        allowed_formats = _OS_FORMATS[self.operational_system]
        if self.format not in allowed_formats:
            raise ValueError(
                f"format '{self.format}' is not supported for {self.operational_system}"
            )
        if self.operational_system == "windows" and self.cpu != "amd":
            raise ValueError("Windows 的 CPU 必须为 amd")
        if self.operational_system == "windows" and self.arch != "x64":
            raise ValueError("Windows 的架构必须为 x64")

    def _validate_optional_fields(self) -> None:
        # Checks icon, pe, donut, encoder and preface options
        if self.exe_icon is not None and self.format != "exe":
            raise ValueError("exe_icon 仅支持 exe 格式")

        pe_fields = (
            self.pe_timestamp,
            self.pe_major_linker_version,
            self.pe_minor_linker_version,
            self.pe_major_os_version,
            self.pe_minor_os_version,
            self.pe_major_image_version,
            self.pe_minor_image_version,
            self.pe_major_subsystem_version,
            self.pe_minor_subsystem_version,
            self.create_pe_strings,
        )
        if any(pe_fields) and self.format not in _PE_FORMATS:
            raise ValueError("PE 头字段仅支持 exe、dll 和 shellcode 格式")

        donut_fields = (
            self.donut_entropy,
            self.donut_compress,
            self.donut_headers,
            self.donut_exit,
            self.donut_thread,
        )
        if any(value is not None for value in donut_fields) and self.format != "shellcode":
            raise ValueError("donut 字段仅支持 shellcode 格式")

        enc = self.shellcode_encoder
        if enc is not None and enc != "off":
            if self.operational_system != "windows":
                raise ValueError("shellcode_encoder 仅在 Windows 上受支持")

        if self.preface is not None and self.format not in _NIM_FORMATS:
            raise ValueError("该格式不支持前言代码")

        if self.show_conhost == "on":
            if self.operational_system != "windows":
                raise ValueError("show_conhost 仅在 Windows 上受支持")
            if self.format != "exe":
                raise ValueError("show_conhost 仅支持 exe 格式")


class StagelessImplantConfig(ImplantConfigBase):
    protocol: StagelessProtocol

    @model_validator(mode="after")
    def validate_stageless(self) -> Self:
        # Checks the stageless protocol, servers and extra fields
        self._validate_os_format_cpu()
        self._validate_optional_fields()

        if self.protocol == "smb":
            if self.operational_system != "windows":
                raise ValueError("SMB 协议仅在 Windows 上受支持")
            if not (self.smb_pipe or "").strip():
                raise ValueError("protocol 为 smb 时必须填写 smb_pipe")
        elif self.protocol == "custom":
            if not (self.custom_channel or "").strip():
                raise ValueError("protocol 为 custom 时必须填写 custom_channel")
        elif not self._filled_servers(self.servers):
            raise ValueError("服务器列表必须至少包含一个端点")

        if self.protocol not in _HTTP_PROTOCOLS and self.body_content is not None:
            raise ValueError("body_content 仅支持 http 和 https 协议")

        if self.protocol != "smb" and self.smb_pipe is not None:
            raise ValueError("仅在 protocol 为 smb 时才支持 smb_pipe")
        if self.protocol != "custom" and self.custom_channel is not None:
            raise ValueError("仅在 protocol 为 custom 时才支持 custom_channel")
        if self.custom_http_relay is not None and self.protocol != "custom":
            raise ValueError("仅在 protocol 为 custom 时才支持 custom_http_relay")

        return self


class LoaderImplantConfig(ImplantConfigBase):
    protocol: LoaderProtocol

    @model_validator(mode="after")
    def validate_loader(self) -> Self:
        # Checks the loader protocol, servers and extra fields
        self._validate_os_format_cpu()
        self._validate_optional_fields()

        if self.protocol == "custom":
            if not (self.custom_channel or "").strip():
                raise ValueError("protocol 为 custom 时必须填写 custom_channel")
        elif not self._filled_servers(self.servers):
            raise ValueError("服务器列表必须至少包含一个 stage URL")

        if self.body_content is not None:
            raise ValueError("loader 植入体不支持 body_content")
        if self.smb_pipe is not None:
            raise ValueError("loader 植入体不支持 smb_pipe")
        if self.protocol != "custom" and self.custom_channel is not None:
            raise ValueError("仅在 protocol 为 custom 时才支持 custom_channel")
        if self.custom_http_relay is not None:
            raise ValueError("loader 植入体不支持 custom_http_relay")

        return self


class BuildStagelessRequest(BaseModel):
    type: Literal["build"]
    implant_base: Literal["stageless"]
    config: StagelessImplantConfig


class BuildLoaderRequest(BaseModel):
    type: Literal["build"]
    implant_base: Literal["loader"]
    config: LoaderImplantConfig


ImplantRequest = Annotated[
    BuildStagelessRequest | BuildLoaderRequest,
    Field(discriminator="implant_base"),
]
