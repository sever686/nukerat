import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const ctaStorageKey = "cta";
const ctaToastId = "nukerat-repo-cta";
const repoUrl = "https://github.com/nukeratframework/nukerat";
const ctaEnterEasing = "cubic-bezier(0.22, 1, 0.36, 1)";
const ctaEnterMs = 1200;

const dismissCta = () => {
  localStorage.setItem(ctaStorageKey, "false");
  toast.dismiss(ctaToastId);
};

const showCtaToast = () => {
  toast("喜欢 NukeRat 吗？", {
    id: ctaToastId,
    className: "!h-auto !min-h-0 !w-[20rem] !py-3 !overflow-visible select-none",
    style: {
      background: "#1515154a",
      backdropFilter: "blur(10px)",
      height: "auto",
      minHeight: "unset",
      width: "auto",
      maxWidth: "none",
      overflow: "visible",
      borderRadius: "9px",
      transition: `transform ${ctaEnterMs}ms ${ctaEnterEasing}, opacity ${ctaEnterMs}ms ${ctaEnterEasing}`,
    },
    classNames: {
      title: "!text-[16px] !font-medium select-none",
      description:
        "!text-[#9B9B9B] !text-[14px] !leading-snug !h-auto !overflow-visible !whitespace-normal select-none",
    },
    description: (
      <div className="flex flex-col gap-2 select-none">
        <p className="m-0 font-[13px] mb-2 mt-1">
          在 GitHub 上给我们点个 Star。只需几秒钟，却能激励我们持续改进项目。
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-0.5">
          <Button
            type="button"
            style={{borderRadius: "7px"}}
            size="sm"
            variant="ghost"
            className="h-7 border-[#2f2f2f] bg-[#222] text-[12px] text-[#d4d4d4] hover:bg-[#292929] hover:text-[#ececec]"
            onClick={(e) => {
              e.stopPropagation();
              window.open(repoUrl, "_blank", "noopener,noreferrer");
              dismissCta();
            }}
          >
            打开仓库
          </Button>
          <Button
            type="button"
            style={{ borderRadius: "7px" }}
            size="sm"
            variant="ghost"
            className="h-7 border border-solid border-[#2f2f2f] bg-transparent text-[12px] text-[#9B9B9B] shadow-none hover:border-[#3a3a3a] hover:bg-[#292929]/40 hover:text-[#d4d4d4]"
            onClick={(e) => {
              e.stopPropagation();
              dismissCta();
            }}
          >
            以后再说
          </Button>
        </div>
      </div>
    ),
    icon: null,
    closeButton: false,
    dismissible: false,
    duration: Infinity,
    position: "bottom-right",
  });
};

export default function CtaToast() {
  useEffect(() => {
    const stored = localStorage.getItem(ctaStorageKey);
    if (stored === "false") return;
    localStorage.setItem(ctaStorageKey, "false");
    showCtaToast();
  }, []);

  return null;
}
