export const clampProgress = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => { const t = clampProgress(value); return t * t * (3 - 2 * t); };

export function storyProgress(top: number, trackHeight: number, screenHeight: number) {
  return clampProgress(-top / Math.max(1, trackHeight - screenHeight));
}

export function messageOpacity(progress: number, index: number) {
  if (index === 0) return 1 - smooth((progress - .12) / .1);
  if (index === 1) return smooth((progress - .27) / .08) * (1 - smooth((progress - .48) / .09));
  return smooth((progress - .73) / .09);
}

export function filmTime(progress: number, duration: number) {
  return clampProgress(progress) * Math.max(0, duration - 1 / 24);
}
