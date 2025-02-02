import { create } from 'zustand';

export const MASK_SIZE = {
  initial: 40,
  onHover: 400,
} as const;

interface MaskState {
  size: number;
  setSize: (size: number) => void;
  mousePos: { x: number; y: number };
  setMousePos: (x: number, y: number) => void;
}

// Create the store
export const useMaskStore = create<MaskState>(set => ({
  mousePos: { x: 0, y: 0 },
  size: MASK_SIZE.initial,
  setMousePos: (x: number, y: number) => set({ mousePos: { x, y } }),
  setSize: size => set({ size }),
}));

// Selectors
export const selectSize = (state: MaskState) => state.size;
export const selectSetSize = (state: MaskState) => state.setSize;
