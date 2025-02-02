import { create } from 'zustand';

export interface MaskState {
  mousePos: { x: number; y: number };
  size: number;
  setMousePos: (x: number, y: number) => void;
  setSize: (size: number) => void;
}

export const MASK_SIZE = {
  initial: 50,
  onHover: 400,
} as const;

export const useMaskStore = create<MaskState>((set) => ({
  mousePos: { x: 0, y: 0 },
  size: MASK_SIZE.initial,
  setMousePos: (x, y) => set({ mousePos: { x, y } }),
  setSize: (size) => set({ size }),
}));
