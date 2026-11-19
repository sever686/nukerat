import { Download, Link, Pencil, RefreshCw, Trash2, Upload } from "lucide-react";
import type { FileServerMenuRuntime, PanelCustomMenuItem, PanelEditMenuBridge } from "./types.ts";
import { menuAction, pathInput } from "./util.ts";

export const fileServerMenuRuntimeRef: { current: FileServerMenuRuntime | null } = { current: null };

export function createFileServerBridge(): PanelEditMenuBridge | null {
  const rt = fileServerMenuRuntimeRef.current;
  if (!rt) return null;
  const off = () => rt.controlsDisabled();
  return {
    resolveEditable: (t) => pathInput(t, "[data-file-server-search-input]", "[data-file-server-search-field]"),
    readValue: () => rt.getSearch(),
    writeValue: (_, v) => rt.setSearch(v),
    canEdit: () => !off(),
    prepareMenu: (t) => rt.prepareFromTarget(t),
    getCustomMenuItems: (): PanelCustomMenuItem[] => [
      menuAction("复制链接", Link, () => rt.copyLink(), () => !rt.canCopyLink() || off()),
      menuAction("重命名", Pencil, () => rt.rename(), () => !rt.canUseSelection() || off()),
      menuAction("下载", Download, () => rt.download(), () => !rt.canUseSelection() || off()),
      menuAction("删除", Trash2, () => rt.deleteFile(), () => !rt.canUseSelection() || off()),
      { kind: "separator" },
      menuAction("上传", Upload, () => rt.upload(), () => !rt.canUpload() || off()),
      menuAction("更新", RefreshCw, () => rt.refresh()),
    ],
  };
}
