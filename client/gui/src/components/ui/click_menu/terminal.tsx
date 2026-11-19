import { toast } from "sonner";
import type { PanelCustomMenuItem, PanelEditMenuBridge, TerminalMenuRuntime } from "./types.ts";
import { html, pathInput } from "./util.ts";

export const terminalMenuRuntimeRef: { current: TerminalMenuRuntime | null } = { current: null };

export function terminalCanCopyContext() {
  const rt = terminalMenuRuntimeRef.current;
  return rt?.canCopyContext() ?? false;
}

export function copyTerminalContext() {
  const rt = terminalMenuRuntimeRef.current;
  if (!rt?.canCopyContext()) return;
  void navigator.clipboard.writeText(
    JSON.stringify({ terminal: ["terminal", ...rt.getOutput()] }),
  );
  toast.success("终端上下文已复制");
}

export function buildTerminalStyleMenuItems(): PanelCustomMenuItem[] {
  const rt = terminalMenuRuntimeRef.current;
  if (!rt) return [];

  return [
    {
      kind: "action",
      label: "样式",
      items: [
        {
          kind: "action",
          label: "字体",
          items: [
            {
              kind: "header",
              label: `${rt.getFontSize()}px`,
            },
            { kind: "separator" },
            {
              kind: "action",
              label: "增大",
              shortcutId: "terminal_font_increase",
              onClick: () => rt.increaseFont(),
              disabled: () => !rt.canIncreaseFont(),
            },
            {
              kind: "action",
              label: "减小",
              shortcutId: "terminal_font_decrease",
              onClick: () => rt.decreaseFont(),
              disabled: () => !rt.canDecreaseFont(),
            },
            { kind: "separator" },
            {
              kind: "action",
              label: "重置",
              shortcutId: "terminal_font_reset",
              onClick: () => rt.resetFont(),
              disabled: () => !rt.canResetFont(),
            },
          ],
        },
      ],
    },
  ];
}

export function createTerminalBridge(): PanelEditMenuBridge {
  const rt = terminalMenuRuntimeRef.current;
  return {
    resolveEditable: (t) => pathInput(t, "[data-terminal-input]", "[data-terminal-input-field]"),
    resolveStaticTextRegion: (t) => {
      const r = html(t)?.closest("[data-terminal-output]");
      return r instanceof HTMLElement ? r : null;
    },
    readValue: () => rt?.getInput() ?? "",
    writeValue: (_, v) => rt?.setInput(v),
    canEdit: () => rt?.canEditInput() ?? false,
    getFooterMenuItems: () => buildTerminalStyleMenuItems(),
  };
}
