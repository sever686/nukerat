import { Bot, LayoutGrid, RefreshCw } from "lucide-react";
import type { PanelEditMenuBridge, ProcessMenuRuntime } from "./types.ts";
import { menuAction, pathInput } from "./util.ts";

export const processMenuRuntimeRef: { current: ProcessMenuRuntime | null } = { current: null };

export function createProcessBridge(): PanelEditMenuBridge | null {
  const rt = processMenuRuntimeRef.current;
  if (!rt) return null;
  const off = () => rt.controlsDisabled();
  return {
    resolveEditable: (t) => pathInput(t, "[data-process-search-input]", "[data-process-search-field]"),
    readValue: () => rt.getSearch(),
    writeValue: (_, v) => rt.setSearch(v),
    canEdit: () => !off(),
    getCustomMenuItems: () => [
      menuAction("刷新", RefreshCw, () => rt.refresh(), off),
      {
        kind: "action",
        label: "视图模式",
        icon: LayoutGrid,
        disabled: off,
        items: [
          { kind: "action", label: "树形", onClick: () => rt.setTreeView() },
          { kind: "action", label: "平铺", onClick: () => rt.setFlatView() },
        ],
      },
    ],
    getFooterMenuItems: () => [
      menuAction("复制上下文", Bot, () => rt.copyContext(), () => off() || !rt.canCopyContext()),
    ],
  };
}
