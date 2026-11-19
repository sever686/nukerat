import { Download } from "lucide-react";
import type { PanelEditMenuBridge, ScreenshotMenuRuntime } from "./types.ts";
import { menuAction, readOnlyInputBridge } from "./util.ts";

export const screenshotMenuRuntimeRef: { current: ScreenshotMenuRuntime | null } = { current: null };

function screenshotCanSave() {
  return screenshotMenuRuntimeRef.current?.canSave() ?? false;
}

function screenshotSave() {
  const rt = screenshotMenuRuntimeRef.current;
  if (!rt?.canSave()) return;
  rt.save();
}

export function createScreenshotBridge(): PanelEditMenuBridge {
  return {
    ...readOnlyInputBridge(),
    getFooterMenuItems: () => [
      menuAction("保存", Download, () => screenshotSave(), () => !screenshotCanSave()),
    ],
  };
}
