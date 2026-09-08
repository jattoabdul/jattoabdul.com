'use client';

import { create } from 'zustand';

/**
 * The door is Contact and Hire. It lives in the header, and the arrival's "Come on in"
 * opens the same room, so both talk to this store. The room animates from the door
 * button's position; the button registers itself as the anchor.
 */
type DoorState = {
  isOpen: boolean;
  anchor: HTMLElement | null;
  setAnchor: (el: HTMLElement | null) => void;
  open: () => void;
  close: () => void;
};

export const useDoorStore = create<DoorState>()(set => ({
  isOpen: false,
  anchor: null,
  setAnchor: el => set({ anchor: el }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
