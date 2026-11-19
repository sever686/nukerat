import type { LucideIcon } from "lucide-react";
import {
  SquareChevronRight,
  Share2,
  Cpu,
  Folder,
  Bug,
  Network,
  Server,
  Plus,
  X,
  Headphones,
  MonitorIcon,
  Info,
  Keyboard,
  CodeXml,
  LogOut,
  Bot,
  Camera,
  KeyRound,
  Globe,
  CodeXmlIcon,
  Scale,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Fullscreen,
  Logs,
  FileText,
  Command,
  MessageCircleMore,
  Fingerprint,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { WorkspaceTab } from "../logic";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { GrHelpBook } from "react-icons/gr";
import { LuSquareCode } from "react-icons/lu";
import {
  ShortcutHint,
  registerTopbarDropdownCloser,
  type ShortcutActionId,
} from "../shortcuts";
import { DownloadsTopbarButton } from "./downloads";
import logoSvg from "@/assets/logo.svg";

export const hostOpenPanels: { type: string; icon: LucideIcon; label: string }[] = [
  { type: "terminal", icon: SquareChevronRight, label: "终端" },
  { type: "explorer", icon: Folder, label: "文件浏览器" },
  { type: "process", icon: Cpu, label: "进程" },
  { type: "screenshot", icon: Camera, label: "截图" },
];

interface MainProps {
  openWindow: (window: string) => void;
  floatWindow: (window: string) => void;
  workspaceTabs: WorkspaceTab[];
  activeTabId: string;
  onTabSelect: (id: string) => void;
  onTabAdd: () => void;
  onTabClose: (id: string) => void;
  onTabRename: (id: string, name: string) => void;
}

const WORKSPACE_TAB_NAME_MAX_LEN = 30;

export default function TopBar(props: MainProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [renamingTabId, setRenamingTabId] = useState<string | null>(null);
  const [renameDraft, setRenameDraft] = useState("");

  const commitTabRename = (tabId: string, fallback: string) => {
    const raw = renameDraft.trim() || fallback;
    const next = raw.slice(0, WORKSPACE_TAB_NAME_MAX_LEN);
    props.onTabRename(tabId, next);
    setRenamingTabId(null);
  };

  const cancelTabRename = () => setRenamingTabId(null);

  useEffect(() => {
    registerTopbarDropdownCloser(() => setOpenMenu(null));
    return () => registerTopbarDropdownCloser(null);
  }, []);

  return (
    <div className="bg-color-workspace">
      <div
        style={{ borderRadius: ".45rem" }}
        className="m3vqw bg-color-workspace"
      >
        <div className="ml-2 mr-2 inline-flex items-center gap-2 text-[13.5px] leading-none primary-text">
          <img
            src={logoSvg}
            alt=""
            className="h-[1em] w-auto shrink-0 opacity-70 object-contain"
          />
          <span className="font-bold tracking-[0.18em]">NUKERAT</span>
        </div>
        <div className="w-px h-4 bg-[#292929] mr-4 ml-4 shrink-0" />

        <TopBarMenu label="NukeRat" openMenu={openMenu} setOpenMenu={setOpenMenu}>
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="flex w-full items-center justify-between gap-2"
              onClick={() => props.floatWindow("servers")}
            >
              <span className="flex items-center gap-2">
                <Server size={13} />
                服务器
              </span>
              <ShortcutHint id="servers" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex w-full items-center justify-between gap-2"
              onClick={() => props.floatWindow("listeners")}
            >
              <span className="flex items-center gap-2">
                <Headphones size={14} />
                监听器
              </span>
              <ShortcutHint id="listeners" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex w-full items-center justify-between gap-2"
              onClick={() => props.floatWindow("implants")}
            >
              <span className="flex items-center gap-2">
                <Bug size={13} />
                植入体
              </span>
              <ShortcutHint id="implants" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex w-full items-center justify-between gap-2"
              onClick={() => props.floatWindow("network")}
            >
              <span className="flex items-center gap-2">
                <Network size={13} />
                网络
              </span>
              <ShortcutHint id="network" />
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => props.floatWindow("agents")}>
              <Bot size={13} />
              智能体
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => props.floatWindow("nukescripts")}>
              <CodeXmlIcon size={13} />
              NukeScripts
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => props.floatWindow("reports")}>
              <HiOutlineDocumentReport size={13} />
              报告
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => props.floatWindow("iocs")}>
              <Fingerprint size={13} />
              IOC
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex w-full items-center justify-between gap-2"
              onClick={() => props.floatWindow("queue")}
            >
              <span className="flex items-center gap-2">
                <Logs size={13} />
                队列
              </span>
              <ShortcutHint id="queue" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex w-full items-center justify-between gap-2"
              onClick={() => props.floatWindow("logs")}
            >
              <span className="flex items-center gap-2">
                <FileText size={13} />
                事件日志
              </span>
              <ShortcutHint id="logs" />
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex w-full items-center justify-between gap-2"
              onClick={() => window.close()}
            >
              <span className="flex items-center gap-2">
                <LogOut size={13} />
                退出
              </span>
              <ShortcutHint id="quit" />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </TopBarMenu>

        <TopBarMenu label="查看" openMenu={openMenu} setOpenMenu={setOpenMenu}>
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="flex w-full items-center justify-between gap-2"
              onClick={() => window.electronAPI?.send("window:toggleFullscreen")}
            >
              <span className="flex items-center gap-2">
                <Fullscreen size={13} />
                全屏
              </span>
              <ShortcutHint id="view_fullscreen" />
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex w-full items-center justify-between gap-2"
              onClick={() => window.electronAPI?.send("window:zoomIn")}
            >
              <span className="flex items-center gap-2">
                <ZoomIn size={13} />
                放大
              </span>
              <ShortcutHint id="view_zoom_in" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex w-full items-center justify-between gap-2"
              onClick={() => window.electronAPI?.send("window:zoomOut")}
            >
              <span className="flex items-center gap-2">
                <ZoomOut size={13} />
                缩小
              </span>
              <ShortcutHint id="view_zoom_out" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex w-full items-center justify-between gap-2"
              onClick={() => window.electronAPI?.send("window:resetZoom")}
            >
              <span className="flex items-center gap-2">
                <RotateCcw size={13} />
                重置缩放
              </span>
              <ShortcutHint id="view_zoom_reset" />
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex w-full items-center justify-between gap-2"
              onClick={() => window.electronAPI?.send("window:toggleDevTools")}
            >
              <span className="flex items-center gap-2">
                <CodeXml size={13} />
                开发者工具
              </span>
              <ShortcutHint id="view_devtools" />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </TopBarMenu>

        <TopBarMenu label="标签页" openMenu={openMenu} setOpenMenu={setOpenMenu}>
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="flex w-full items-center justify-between gap-2"
              onClick={() => props.openWindow("terminal")}
            >
              <span className="flex items-center gap-2">
                <SquareChevronRight size={13} />
                终端
              </span>
              <ShortcutHint id="terminal" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex w-full items-center justify-between gap-2"
              onClick={() => props.openWindow("explorer")}
            >
              <span className="flex items-center gap-2">
                <Folder size={13} />
                文件浏览器
              </span>
              <ShortcutHint id="explorer" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex w-full items-center justify-between gap-2"
              onClick={() => props.openWindow("process")}
            >
              <span className="flex items-center gap-2">
                <Cpu size={13} />
                进程
              </span>
              <ShortcutHint id="process" />
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => props.openWindow("screenshot")}>
              <Camera size={13} />
              截图
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => props.openWindow("keylogger")}>
              <Keyboard size={13} />
              键盘记录
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex w-full items-center justify-between gap-2"
              onClick={() => props.openWindow("credentials")}
            >
              <span className="flex items-center gap-2">
                <KeyRound size={13} />
                凭据
              </span>
              <ShortcutHint id="credentials" />
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex w-full items-center justify-between gap-2"
              onClick={() => props.openWindow("sessions")}
            >
              <span className="flex items-center gap-2">
                <MonitorIcon size={13} />
                会话
              </span>
              <ShortcutHint id="sessions" />
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => props.openWindow("graphs")}>
              <Share2 size={13} />
              攻击图谱
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex w-full items-center justify-between gap-2"
              onClick={() => props.openWindow("agent")}
            >
              <span className="flex items-center gap-2">
                <Bot size={13} />
                AI 智能体
              </span>
              <ShortcutHint id="agent" />
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => props.openWindow("fileServer")}>
              <Globe size={13} />
              文件服务器
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => props.openWindow("nukescripts_output")}>
              <LuSquareCode size={13} />
              NS 调试器
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </TopBarMenu>

        <TopBarMenu label="帮助" openMenu={openMenu} setOpenMenu={setOpenMenu}>
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="flex w-full items-center justify-between gap-2"
              onClick={() =>
                window.open("https://nukerat.com/docs", "_blank")
              }
            >
              <span className="flex items-center gap-2">
                <GrHelpBook size={13} />
                文档
              </span>
              <ShortcutHint id="docs" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                window.open("https://nukerat.com/docs/shortcuts", "_blank")
              }
            >
              <Command size={13} />
              快捷键
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() =>
                window.open(
                  "https://github.com/nukeratframework/nukerat/discussions/new?category=ideas",
                  "_blank"
                )
              }
            >
              <MessageCircleMore size={13} />
              反馈
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                window.open(
                  "https://raw.githubusercontent.com/nukeratframework/nukerat/refs/heads/main/LICENSE",
                  "_blank"
                )
              }
            >
              <Scale size={13} />
              许可证
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => props.floatWindow("about")}>
              <Info size={10} />
              关于
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </TopBarMenu>

        <div className="w-px h-4 bg-[#292929] mr-4 ml-4 shrink-0" />

        <NavItem
          onClick={() => props.openWindow("terminal")}
          type="icons-only"
          icon={<SquareChevronRight size={18.5} />}
          label="终端"
          title="终端"
          desc="交互式会话控制台"
          shortcutId="terminal"
        />
        <NavItem
          onClick={() => props.openWindow("explorer")}
          type="icons-only"
          icon={<Folder size={18.5} />}
          label="文件浏览器"
          title="文件浏览器"
          desc="浏览当前主机上的文件"
          shortcutId="explorer"
        />
        <NavItem
          onClick={() => props.openWindow("process")}
          type="icons-only"
          icon={<Cpu size={18.5} />}
          label="进程"
          title="进程"
          desc="查看并管理主机进程"
          shortcutId="process"
        />

        <div className="w-px h-4 bg-[#292929] mr-4 ml-4 shrink-0" />

        <NavItem
          onClick={() => props.openWindow("screenshot")}
          type="icons-only"
          icon={<Camera size={20} />}
          label="截图"
          title="截图"
          desc="截取远程桌面画面"
        />
        <NavItem
          onClick={() => props.openWindow("keylogger")}
          type="icons-only"
          icon={<Keyboard size={18.5} />}
          label="键盘记录"
          title="键盘记录"
          desc="捕获键盘事件"
        />
        <NavItem
          onClick={() => props.openWindow("credentials")}
          type="icons-only"
          icon={<KeyRound size={18.5} />}
          label="凭据"
          title="凭据"
          desc="管理已存储的凭据"
          shortcutId="credentials"
        />

        <div className="w-px h-4 bg-[#292929] mr-4 ml-4 shrink-0" />

        <NavItem
          onClick={() => props.openWindow("sessions")}
          type="icons-only"
          icon={<MonitorIcon size={18.5} />}
          label="会话"
          title="会话"
          desc="查看活动会话"
          shortcutId="sessions"
        />
        <NavItem
          onClick={() => props.openWindow("graphs")}
          type="icons-only"
          icon={<Share2 size={18.5} />}
          label="攻击图谱"
          title="攻击图谱"
          desc="可视化横向移动与跳板"
        />

        <div className="w-px h-4 bg-[#292929] mr-4 ml-4 shrink-0" />

        <NavItem
          onClick={() => props.openWindow("agent")}
          type="icons-only"
          icon={<Bot size={22} />}
          label="AI 智能体"
          title="AI 智能体"
          desc="AI 辅助的会话操作"
          shortcutId="agent"
        />
        <NavItem
          onClick={() => props.openWindow("fileServer")}
          type="icons-only"
          icon={<Globe size={18.5} />}
          label="文件服务器"
          title="文件服务器"
          desc="团队服务器文件暂存"
        />

        <DownloadsTopbarButton />

        <div className="w-px h-4 bg-[#292929] mr-4 ml-4 shrink-0" />

        {/* Workspace tabs -------------------------*/}

        {props.workspaceTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => props.onTabSelect(tab.id)}
              onMouseDown={(e) => {
                if (e.button !== 1) return;
                e.preventDefault();
                e.stopPropagation();
                props.onTabClose(tab.id);
              }}
              style={{ fontWeight: "500", padding: "0px 7px 0px 7px" }}
              className={`button-default text-[.8rem] ml-0.5 cursor-pointer group flex items-center gap-1.5 px-2 py-0.5 rounded font-medium whitespace-nowrap transition-colors ${
                tab.id === props.activeTabId
                  ? "bg-[#2a2a2a] primary-text border border-[#3a3a3a]"
                  : "primary-text hover:text-[#a0a0a0] hover:bg-[#1e1e1e] border border-transparent"
              }`}
            >
              {renamingTabId === tab.id ? (
                <input
                  autoFocus
                  maxLength={WORKSPACE_TAB_NAME_MAX_LEN}
                  value={renameDraft}
                  onChange={(e) =>
                    setRenameDraft(e.target.value.slice(0, WORKSPACE_TAB_NAME_MAX_LEN))
                  }
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  onBlur={() => commitTabRename(tab.id, tab.name)}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.key === "Enter") {
                      e.preventDefault();
                      commitTabRename(tab.id, tab.name);
                    }
                    if (e.key === "Escape") {
                      e.preventDefault();
                      cancelTabRename();
                    }
                  }}
                  className="workspace-tab-rename-input"
                  style={{
                    width: `${Math.min(Math.max(renameDraft.length, 4), WORKSPACE_TAB_NAME_MAX_LEN)}ch`,
                  }}
                />
              ) : (
                <span
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    setRenamingTabId(tab.id);
                    setRenameDraft(tab.name.slice(0, WORKSPACE_TAB_NAME_MAX_LEN));
                  }}
                >
                  {tab.name}
                </span>
              )}
              {props.workspaceTabs.length > 1 && (
                <span
                  role="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onTabClose(tab.id);
                  }}
                  className="group-hover:opacity-100 hover:text-red-400 transition rounded p-0.5"
                >
                  <X size={13} />
                </span>
              )}
            </button>
        ))}
        <button
          onClick={props.onTabAdd}
          title="新建工作区"
          className="button-default p-1 rounded text-[#6b6b6b] hover:text-[#a0a0a0] hover:bg-[#1e1e1e] transition-colors"
        >
          <Plus size={17} />
        </button>
        {/* Workspace end ----------------------*/}

        <div className="flex-1" />
      </div>
    </div>
  );
}

function TopBarMenu({
  label,
  children,
  openMenu,
  setOpenMenu,
}: {
  label: string;
  children: React.ReactNode;
  openMenu: string | null;
  setOpenMenu: (id: string | null) => void;
}) {
  return (
    <DropdownMenu
      open={openMenu === label}
      onOpenChange={(open) => setOpenMenu(open ? label : null)}
    >
      <DropdownMenuTrigger asChild>
        <div className="ml-0.5 mr-0.5 font-[400] flex items-center gap-1.5 cursor-pointer rounded px-2 py-1 text-[13.5px] primary-text">
          <span>{label}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={0}
        className="topbar-menu-dropdown rounded-[8px] [&_[data-slot=dropdown-menu-group]]:w-full [&_[data-slot=dropdown-menu-sub-trigger]]:w-full"
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NavItem({
  type,
  icon,
  label,
  title,
  desc,
  onClick,
}: {
  type?: string;
  icon: React.ReactNode;
  label: string;
  title?: string;
  desc?: string;
  shortcutId?: ShortcutActionId;
  onClick?: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={onClick}
          className="button-default hover:underline cursor-pointer flex items-center gap-1.5 px-3 py-2 text-[1rem] primary-text rounded font-medium"
        >
          {icon}
          {type !== "icons-only" && label}
        </button>
      </TooltipTrigger>
      {title && desc && (
        <TooltipContent
          side="bottom"
          className="bg-[#3A3A3A] flex flex-col items-start gap-1 text-left"
          style={{ borderRadius: "7px" }}
        >
          <div className="font-semibold text-xs text-left w-full">{title}</div>
          <div
            className="text-xs opacity-90 text-left w-full"
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        </TooltipContent>
      )}
    </Tooltip>
  );
}
