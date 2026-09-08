'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/**
 * Prototype-only choices for the redesign branch. Each is a decision the owner takes
 * in the browser instead of reading about it. Remove this store, the controls panel,
 * and the losing variants once the homepage is locked.
 *
 * URL parameters override the stored choice so a state can be shared as a link:
 *   /?treatment=light&side=right&photo=plain&door2=instagram
 */
export type HeroTreatment = 'dark' | 'light';
export type PortraitSide = 'left' | 'right';
export type PhotoSlot = 'study' | 'plain';
export type DoorSecondAction = 'youtube' | 'instagram';

type PrototypeState = {
  treatment: HeroTreatment;
  side: PortraitSide;
  photo: PhotoSlot;
  door2: DoorSecondAction;
  set: (patch: Partial<Omit<PrototypeState, 'set'>>) => void;
};

export const usePrototypeStore = create<PrototypeState>()(
  persist(
    set => ({
      treatment: 'dark',
      side: 'left',
      photo: 'study',
      door2: 'youtube',
      set: patch => set(patch),
    }),
    {
      name: 'ja-home-v2',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);

const KEYS = ['treatment', 'side', 'photo', 'door2'] as const;
const ALLOWED: Record<(typeof KEYS)[number], readonly string[]> = {
  treatment: ['dark', 'light'],
  side: ['left', 'right'],
  photo: ['study', 'plain'],
  door2: ['youtube', 'instagram'],
};

/** Rehydrate from localStorage, then let URL parameters win. Call once on the client. */
export function hydratePrototypeStore() {
  void usePrototypeStore.persist.rehydrate();
  const params = new URLSearchParams(window.location.search);
  const patch: Partial<Omit<PrototypeState, 'set'>> = {};
  for (const key of KEYS) {
    const value = params.get(key);
    if (value && ALLOWED[key].includes(value)) {
      (patch as Record<string, string>)[key] = value;
    }
  }
  if (Object.keys(patch).length) usePrototypeStore.getState().set(patch);
}
