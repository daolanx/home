export function isDesktop(): boolean {
  return window.matchMedia("(min-width: 768px)").matches;
}