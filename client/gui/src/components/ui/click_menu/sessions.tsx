import { Bot, RefreshCw, Trash2 } from "lucide-react";
import {
  buildSessionsMenuHeader,
  buildSessionsOpenMenu,
  buildSessionsKillMenu,
} from "@/components/canva/workspace/sessions/components/rigth-click-menu";
import type { PanelEditMenuBridge, SessionsMenuRuntime } from "./types.ts";
import { menuAction, pathInput } from "./util.ts";

export const sessionsMenuRuntimeRef: { current: SessionsMenuRuntime | null } = { current: null };

function sessionsCanCopyContext() {
  return sessionsMenuRuntimeRef.current?.canCopyContext() ?? false;
}

function sessionsCopyContext() {
  const rt = sessionsMenuRuntimeRef.current;
  if (!rt?.canCopyContext()) return;
  rt.copyContext();
}

function sessionsCanRefresh() {
  return sessionsMenuRuntimeRef.current?.canRefresh() ?? false;
}

function sessionsRefresh() {
  const rt = sessionsMenuRuntimeRef.current;
  if (!rt?.canRefresh()) return;
  rt.refresh();
}

function sessionsCanRemoveSelected() {
  return sessionsMenuRuntimeRef.current?.canRemoveSelected() ?? false;
}

function sessionsRemoveSelected() {
  const rt = sessionsMenuRuntimeRef.current;
  if (!rt?.canRemoveSelected()) return;
  rt.removeSelected();
}

function sessionsCanRemoveAll() {
  return sessionsMenuRuntimeRef.current?.canRemoveAll() ?? false;
}

function sessionsRemoveAll() {
  const rt = sessionsMenuRuntimeRef.current;
  if (!rt?.canRemoveAll()) return;
  rt.removeAll();
}

export function createSessionsBridge(): PanelEditMenuBridge {
  return {
    resolveEditable: (t) => pathInput(t, "[data-sessions-search-input]", "[data-sessions-search-field]"),
    readValue: () => sessionsMenuRuntimeRef.current?.getSearch() ?? "",
    writeValue: (_, v) => sessionsMenuRuntimeRef.current?.setSearch(v),
    prepareMenu: (t) => sessionsMenuRuntimeRef.current?.prepareFromTarget(t),
    getCustomMenuItems: () => [
      ...buildSessionsMenuHeader(),
      ...buildSessionsOpenMenu(),
      menuAction("更新", RefreshCw, () => sessionsRefresh(), () => !sessionsCanRefresh()),
      { kind: "separator" },
      ...buildSessionsKillMenu(),
      {
        kind: "action",
        label: "移除",
        icon: Trash2,
        disabled: () => !sessionsCanRemoveSelected() && !sessionsCanRemoveAll(),
        items: [
          {
            kind: "action",
            label: "所选",
            onClick: () => sessionsRemoveSelected(),
            disabled: () => !sessionsCanRemoveSelected(),
          },
          {
            kind: "action",
            label: "全部",
            onClick: () => sessionsRemoveAll(),
            disabled: () => !sessionsCanRemoveAll(),
          },
        ],
      },
    ],
    getFooterMenuItems: () => [
      menuAction("复制上下文", Bot, () => sessionsCopyContext(), () => !sessionsCanCopyContext()),
    ],
  };
}
