export const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t); };

// Primeiro a folha chega à lateral; então gira e se junta às folhas recolhidas.
export function panePose(progress: number, index: number, count: number, width: number) {
  const phase = clamp(clamp(progress) * count - (count - 1 - index));
  const paneWidth = width / count;
  const gap = Math.min(7, width * .012);
  const target = width - paneWidth - (count - 1 - index) * gap;
  return {
    x: (target - index * paneWidth) * smooth(phase / .58),
    angle: -83 * smooth((phase - .42) / .58),
    depth: (count - index) * 1.5 * phase,
  };
}

export function scrollOpening(top: number, height: number, stickyHeight: number, inset: number) {
  return clamp((inset - top) / Math.max(1, height - stickyHeight));
}
