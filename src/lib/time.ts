export function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  if (locale === "zh") {
    return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "long", day: "numeric" }).format(date);
  }
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(date);
}
