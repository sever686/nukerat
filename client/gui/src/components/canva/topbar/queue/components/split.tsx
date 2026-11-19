import { X } from "lucide-react";
import { yn, type QueueEntry } from "./logic";

const formatParametersDisplay = (raw: string): string => {
  const trimmed = raw?.trim() ?? "";
  if (!trimmed) return "";
  try {
    return JSON.stringify(JSON.parse(trimmed), null, 2);
  } catch {
    return raw;
  }
};

export default function SplitPanel({ entry, onClose }: { entry: QueueEntry; onClose: () => void }) {
  const parametersDisplay = formatParametersDisplay(entry.parameters);

  return (
    <div className="flex flex-col h-full min-h-0 min-w-[32rem]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a2a] shrink-0">
        <span className="text-[13.5px] font-semibold text-[#cecece] tracking-wide">队列</span>
        <button type="button" onClick={onClose} className="p-1 rounded text-[#6b6b6b] hover:text-[#d4d4d4] hover:bg-[#2a2a2a] transition-colors cursor-pointer">
          <X size={13} />
        </button>
      </div>
      <div className="flex-1 min-h-0 min-w-0 overflow-y-auto px-4 py-4">
          {(
            [
              ["时间", entry.time],
              ["服务器", entry.server],
              ["主机", entry.host],
              ["标签", entry.tag],
              ["类型", entry.type],
              ["已完成", yn(entry.isCompleted)],
              ["已捕获", yn(entry.captured)],
            ] as const
          ).map(([label, value]) => (
            <div key={label} className="mb-3">
              <label className="block text-[12px] text-[#6e6e6e] mb-1.5 uppercase tracking-widest">{label}</label>
              <input
                readOnly
                tabIndex={-1}
                value={value || "-"}
                className="w-full bg-[#212121] border border-[#363636] text-[#cecece] text-[13.5px] rounded px-3 py-2 outline-none cursor-text select-text"
              />
            </div>
          ))}
          <div className="mb-3">
            <label className="block text-[12px] text-[#6e6e6e] mb-1.5 uppercase tracking-widest">输入</label>
            <input
              readOnly
              tabIndex={-1}
              value={entry.input}
              className="w-full bg-[#212121] border border-[#363636] text-[#cecece] text-[13.5px] rounded px-3 py-2 outline-none cursor-text select-text"
            />
          </div>
          <div className="mb-3">
            <label className="block text-[12px] text-[#6e6e6e] mb-1.5 uppercase tracking-widest">参数</label>
            <textarea
              readOnly
              tabIndex={-1}
              value={parametersDisplay}
              className="w-full bg-[#212121] border border-[#363636] text-[#cecece] text-[13.5px] rounded px-3 py-2 outline-none cursor-text select-text font-mona-mono leading-relaxed min-h-[200px] resize-y"
            />
          </div>
          {(
            [
              ["output", "min-h-[140px]"],
              ["error", "min-h-[80px]"],
            ] as const
          ).map(([label, h]) => (
            <div key={label} className="mb-3">
              <label className="block text-[12px] text-[#6e6e6e] mb-1.5 uppercase tracking-widest">{label}</label>
              <textarea
                readOnly
                tabIndex={-1}
                value={entry[label]}
                className={`w-full bg-[#212121] border border-[#363636] text-[#cecece] text-[13.5px] rounded px-3 py-2 outline-none min-h-[200px] cursor-text select-text ${h} resize-y`}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
