import { getTranslations } from "next-intl/server";

export default async function Loading() {
  const t = await getTranslations("Loading");
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="font-label-caps text-xs tracking-widest uppercase text-on-surface-variant">
          {t("text")}
        </span>
      </div>
    </div>
  );
}
