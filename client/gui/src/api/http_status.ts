const HTTP_STATUS_MESSAGE: Record<number, string> = {
  400: "请求无效",
  401: "未授权",
  403: "禁止访问",
  404: "未找到",
  405: "方法不允许",
  408: "请求超时",
  409: "冲突",
  413: "负载过大",
  415: "不支持的媒体类型",
  422: "无法处理的实体",
  429: "请求过多",
  500: "内部错误",
  501: "未实现",
  502: "网关错误",
  503: "服务不可用",
  504: "网关超时",
};

export function httpStatusMessage(status: number): string {
  return HTTP_STATUS_MESSAGE[status] ?? `HTTP ${status}`;
}

export function responseErrorMessage(status: number, bodyMessage?: unknown): string {
  if (status < 200 || status >= 300) return httpStatusMessage(status);
  return typeof bodyMessage === "string" && bodyMessage.trim()
    ? bodyMessage
    : "请求失败";
}

const GENERIC_FETCH_ERRORS = new Set([
  "Failed to fetch",
  "NetworkError when attempting to fetch resource.",
  "Load failed",
  "Network request failed",
]);

export function unreachableHost(name?: string): string {
  const label = name?.trim();
  return label ? `${label}: 主机不可达` : "主机不可达";
}

export function thrownErrorMessage(error: unknown, name?: string): string {
  const msg = error instanceof Error ? error.message.trim() : "";
  if (!msg || GENERIC_FETCH_ERRORS.has(msg)) return unreachableHost(name);
  return msg;
}
