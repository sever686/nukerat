import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  Bot,
  LayoutGrid,
  RefreshCw,
} from "lucide-react";
import type { ExplorerMenuRuntime, PanelEditMenuBridge } from "./types.ts";
import { menuAction, pathInput } from "./util.ts";

export const explorerMenuRuntimeRef: { current: ExplorerMenuRuntime | null } = { current: null };

export function createExplorerBridge(): PanelEditMenuBridge | null {
  const rt = explorerMenuRuntimeRef.current;
  if (!rt) return null;
  const off = () => rt.controlsDisabled();
  return {
    resolveEditable: (t) => pathInput(t, "[data-explorer-path-input]", "[data-explorer-path-field]"),
    readValue: () => rt.getPathInput(),
    writeValue: (_, v) => rt.setPathInput(v),
    canEdit: () => !off(),
    getCustomMenuItems: () => [
      menuAction("后退", ArrowLeft, () => rt.goBack(), () => !rt.canBack() || off()),
      menuAction("前进", ArrowRight, () => rt.goForward(), () => !rt.canForward() || off()),
      menuAction("刷新", RefreshCw, () => rt.refresh(), off),
      menuAction("下载", ArrowDownToLine, () => rt.download(), () => !rt.canDownload() || off()),
      {
        kind: "action",
        label: "网格视图",
        icon: LayoutGrid,
        disabled: off,
        items: [
          { kind: "action", label: "网格", onClick: () => rt.setGridView() },
          { kind: "action", label: "列表", onClick: () => rt.setListView() },
        ],
      },
      menuAction("复制上下文", Bot, () => rt.copyContext(), () => off() || !rt.canCopyContext()),
    ],
  };
}
