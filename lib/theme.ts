export function getThemedImage(lightPath: string): string {
  // Usage: getThemedImage("/img/hero/lobby.webp")
  // When dark mode is active, resolves to "/dark/img/hero/lobby.webp"
  // The actual resolution happens in ThemedImage component using next-themes
  return lightPath;
}

export function getDarkPath(lightPath: string): string {
  // Converts /img/hero/lobby.webp → /dark/img/hero/lobby.webp
  return `/dark${lightPath}`;
}
