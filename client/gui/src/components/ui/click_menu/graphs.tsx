import { Maximize2, RefreshCw, ZoomIn, ZoomOut } from "lucide-react";
import type { GraphsMenuRuntime, PanelEditMenuBridge } from "./types.ts";
import { menuAction, readOnlyInputBridge } from "./util.ts";

export const graphsMenuRuntimeRef: { current: GraphsMenuRuntime | null } = { current: null };

export function createGraphsBridge(): PanelEditMenuBridge | null {
  const rt = graphsMenuRuntimeRef.current;
  if (!rt) return null;
  return {
    ...readOnlyInputBridge(),
    getCustomMenuItems: () => [
      menuAction("更新", RefreshCw, () => rt.refresh()),
      menuAction("放大", ZoomIn, () => rt.zoomIn()),
      menuAction("缩小", ZoomOut, () => rt.zoomOut()),
      menuAction("适应视图", Maximize2, () => rt.fitView()),
    ],
  };
}
