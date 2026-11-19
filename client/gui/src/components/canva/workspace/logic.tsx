import { useImperativeHandle, useRef, type Ref } from "react";
import type { DockviewApi } from "dockview";
import type { Session } from "@/api/sessions";

function panelAtPointer(api: DockviewApi, clientX: number, clientY: number) {
  const hit = document.elementFromPoint(clientX, clientY);
  if (!hit) return undefined;

  for (const panel of api.panels) {
    const content = panel.view?.content?.element;
    const tab = panel.view?.tab?.element;
    if (content && (content === hit || content.contains(hit))) return panel;
    if (tab && (tab === hit || tab.contains(hit))) return panel;
  }

  for (const group of api.groups) {
    const el = (group as { element?: HTMLElement }).element;
    if (el?.contains(hit)) return group.activePanel;
  }

  return undefined;
}

export type SessionSelectData = { host: Session; server: string } | null;

export type PanelOpenParams = { selectedHost?: SessionSelectData };

export const pendingPanelParamsRef = {
  current: null as PanelOpenParams | null,
};

export interface WorkspaceProps {
  setWindows: (hasWindows: boolean) => void;
  pendingWindow?: string | null;
  pendingPanelParams?: PanelOpenParams | null;
  onWindowOpen?: () => void;
}

export type WorkspaceHandle = {
  openWindow: (windowType: string) => void;
  closeHoveredPanel: () => void;
};

const hostless_titles = new Set([
  "文档",
  "攻击图谱",
  "会话",
  "文件服务器",
  "AI 智能体",
  "键盘记录",
  "队列",
  "NukeScript",
  "凭据",
  "NS 调试器",
  "监听器",
  "网络",
  "服务器",
  "植入体",
  "事件日志",
  "智能体",
  "IOC",
  "报告",
  "关于",
]);

export function getPanelTitle(windowType: string): string {
  if (windowType === "agent") return "AI 智能体";
  if (windowType === "explorer") return "文件浏览器";
  if (windowType === "fileServer") return "文件服务器";
  if (windowType === "nukescripts_output") return "NS 调试器";
  if (windowType === "nukescripts") return "NukeScript";
  if (windowType === "iocs") return "IOC";
  return windowType.charAt(0).toUpperCase() + windowType.slice(1);
}

export function shouldShowHostSelect(title: string | undefined): boolean {
  return !hostless_titles.has(title ?? "");
}

export function getPanelHeaderJustify(title: string | undefined): "left" | "between" {
  return hostless_titles.has(title ?? "") ? "left" : "between";
}

export function useWorkspace(
  { setWindows, pendingWindow, pendingPanelParams, onWindowOpen }: WorkspaceProps,
  ref: Ref<WorkspaceHandle>
) {
  const dockviewRef = useRef<DockviewApi | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  const addPanel = (windowType: string, panelParams?: PanelOpenParams | null) => {
    if (!dockviewRef.current) return;
    const params = panelParams ?? pendingPanelParamsRef.current;
    pendingPanelParamsRef.current = null;
    dockviewRef.current.addPanel({
      id: `${windowType}-${Date.now()}`,
      component: windowType,
      tabComponent: "header",
      title: getPanelTitle(windowType),
      position: { direction: "right" },
      ...(params ? { params } : {}),
    });
  };

  const closeHoveredPanel = () => {
    const api = dockviewRef.current;
    if (!api) return;
    const { x, y } = pointerRef.current;
    const panel = panelAtPointer(api, x, y) ?? api.activePanel ?? undefined;
    panel?.api.close();
  };

  useImperativeHandle(ref, () => ({
    openWindow: addPanel,
    closeHoveredPanel,
  }));

  const onWorkspacePointerMove = (e: React.PointerEvent) => {
    pointerRef.current = { x: e.clientX, y: e.clientY };
  };

  const onDockviewReady = (e: { api: any }) => {
    dockviewRef.current = e.api;
    e.api.onDidAddPanel(() => setWindows(e.api.panels.length > 0));
    e.api.onDidRemovePanel(() => setWindows(e.api.panels.length > 0));

    if (pendingWindow) {
      addPanel(pendingWindow, pendingPanelParams);
      onWindowOpen?.();
    }
  };

  return { onDockviewReady, onWorkspacePointerMove };
}
