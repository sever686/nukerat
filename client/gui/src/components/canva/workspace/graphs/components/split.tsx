import { X } from "lucide-react";
import type { GraphSession } from "@/api/graphs";
import { classes } from "../style";
import { formatDate } from "./logic";

const formatValue = (value: unknown) =>
  value == null || `${value}`.trim() === "" ? "-" : String(value);

export default function SplitPanel({ host, onClose }: { host: GraphSession | null; onClose: () => void }) {
  let implant: Record<string, unknown> | null = null;
  try {
    if (host?.implant_config) implant = JSON.parse(host.implant_config);
  } catch {}

  const fields = [
    ["最后检查", host?.last_activity || "-"],
    ["标签", host?.tag],
    ["主机名", host?.hostname],
    ["用户", host?.user],
    ["权限", host?.privilege || "user"],
    ["内网", host?.internal ?? host?.ip],
    ["外部", host?.external_ip],
    ["监听器", host?.listener],
    ["主机服务器", host?.host_server],
    ["主机端口", host?.host_port],
    ["架构", host?.arch],
    ["PID", host?.pid],
    ["进程", host?.process],
    ["操作系统", host?.os],
    ["首次发现", formatDate(host?.first_seen)],
    ["最近发现", formatDate(host?.last_seen)],
    ["延迟", host?.delay],
    ["服务器", host?._server],
  ] as const;

  return (
    <>
      <div className={classes.splitHeader}>
        <span className={classes.splitTitle}>查看 - {host?.tag ?? "主机"}</span>
        <button type="button" onClick={onClose} className={classes.splitClose}>
          <X size={13} />
        </button>
      </div>
      <div className={classes.splitBody}>
        <div className={classes.splitContent}>
          {fields.map(([label, value]) => (
            <div key={label} className={classes.splitField}>
              <label className={classes.splitLabel}>{label}</label>
              <input
                type="text"
                readOnly
                tabIndex={-1}
                value={formatValue(value)}
                className={`${classes.splitValue} outline-none cursor-text${label === "监听器" ? " uppercase" : ""}`}
              />
            </div>
          ))}
          <div className={classes.splitField}>
            <label className={classes.splitLabel}>植入体配置</label>
            {implant && typeof implant === "object" ? (
              <div className={classes.splitImplantBox}>
                {Object.entries(implant).map(([key, val], i, arr) => (
                  <div key={key} className={classes.splitImplantRow(i === arr.length - 1)}>
                    <span className={classes.splitImplantKey}>{key}</span>
                    <input
                      type="text"
                      readOnly
                      tabIndex={-1}
                      value={String(val)}
                      className={`${classes.splitValue} ${classes.splitImplantVal} min-w-0 flex-1 border-0 bg-transparent px-0 py-0 outline-none cursor-text`}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <input
                type="text"
                readOnly
                tabIndex={-1}
                value={host?.implant_config?.trim() ? host.implant_config : "-"}
                className={`${classes.splitValue} outline-none cursor-text`}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
