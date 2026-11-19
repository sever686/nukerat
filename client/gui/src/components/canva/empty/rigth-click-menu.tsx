import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Bug,
  Camera,
  CodeXml,
  Cpu,
  Folder,
  Globe,
  Headphones,
  Keyboard,
  KeyRound,
  MonitorIcon,
  Network,
  Plus,
  Scale,
  Server,
  Share2,
  SquareChevronRight,
  Logs,
  FileText,
} from "lucide-react";
import { PanelMenuShell, type PanelCustomMenuItem } from "@/components/ui/rigth-click-menu.tsx";

export type EmptyMenuRuntime = {
  openWindow: (windowType: string) => void;
  floatWindow: (windowType: string) => void;
};

export const emptyMenuRuntimeRef: { current: EmptyMenuRuntime | null } = { current: null };

const open = (t: string) => () => emptyMenuRuntimeRef.current?.openWindow(t);
const float = (t: string) => () => emptyMenuRuntimeRef.current?.floatWindow(t);

const leaf = (label: string, icon?: LucideIcon, onClick?: () => void): PanelCustomMenuItem => ({
  kind: "action",
  label,
  icon,
  onClick,
});

const group = (label: string, items: PanelCustomMenuItem[], icon?: LucideIcon): PanelCustomMenuItem => ({
  kind: "action",
  label,
  icon,
  items,
});

const sep = (): PanelCustomMenuItem => ({ kind: "separator" });

export function buildEmptyWorkspaceMenuItems(): PanelCustomMenuItem[] {
  return [
    group(
      "新建",
      [
        leaf("终端", SquareChevronRight, open("terminal")),
        leaf("文件浏览器", Folder, open("explorer")),
        leaf("进程", Cpu, open("process")),
        sep(),
        leaf("截图", Camera, open("screenshot")),
        leaf("键盘记录", Keyboard, open("keylogger")),
        leaf("凭据", KeyRound, open("credentials")),
        sep(),
        leaf("目标", MonitorIcon, open("sessions")),
        leaf("攻击图谱", Share2, open("graphs")),
        sep(),
        leaf("AI 智能体", Bot, open("agent")),
        leaf("文件服务器", Globe, open("fileServer")),
        sep(),
        leaf("NS 调试器", CodeXml, open("nukescripts_output")),
      ],
      Plus
    ),
    group("NukeRat", [
      leaf("服务器", Server, float("servers")),
      leaf("监听器", Headphones, float("listeners")),
      leaf("植入体", Bug, float("implants")),
      leaf("网络", Network, float("network")),
      sep(),
      leaf("智能体", Bot, float("agents")),
      leaf("NukeScripts", CodeXml, float("nukescripts")),
      sep(),
      group(
        "报告",
        [leaf("文件", undefined, float("reports")), leaf("IOC", undefined, float("iocs"))],
        Scale
      ),
      sep(),
      leaf("队列", Logs, float("queue")),
      leaf("事件日志", FileText, float("logs")),
    ]),
  ];
}

export function EmptyViewShell({ children }: { children: ReactNode }) {
  return <PanelMenuShell kind="emptyWorkspace">{children}</PanelMenuShell>;
}
