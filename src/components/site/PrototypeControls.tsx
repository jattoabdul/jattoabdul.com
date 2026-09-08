'use client';

import { useEffect } from 'react';

import {
  hydratePrototypeStore,
  usePrototypeStore,
  type DoorSecondAction,
  type HeroTreatment,
  type PhotoSlot,
  type PortraitSide,
} from '@/lib/prototype-store';

/**
 * Prototype controls. Not part of the site: flips the decisions still open so the owner can
 * judge them live. Delete with the losing variants once the homepage is locked.
 */
export function PrototypeControls() {
  const state = usePrototypeStore();
  useEffect(() => hydratePrototypeStore(), []);

  return (
    <details id="prototype-controls" className="proto">
      <summary>Prototype controls</summary>
      <div className="proto-body">
        <Group<HeroTreatment>
          legend="Hero treatment"
          name="treatment"
          value={state.treatment}
          options={[
            ['dark', 'Dark, full bleed'],
            ['light', 'Light, on paper'],
          ]}
          onChange={v => state.set({ treatment: v })}
        />
        <Group<PortraitSide>
          legend="Portrait side"
          name="side"
          value={state.side}
          options={[
            ['left', 'Left'],
            ['right', 'Right'],
          ]}
          onChange={v => state.set({ side: v })}
        />
        <Group<PhotoSlot>
          legend="Photo slot (dark treatment)"
          name="photo"
          value={state.photo}
          options={[
            ['study', 'Light study'],
            ['plain', 'Plain navy'],
          ]}
          onChange={v => state.set({ photo: v })}
        />
        <Group<DoorSecondAction>
          legend="Door, second action"
          name="door2"
          value={state.door2}
          options={[
            ['youtube', 'YouTube'],
            ['instagram', '@jatto_abdul'],
          ]}
          onChange={v => state.set({ door2: v })}
        />
        <p className="proto-note">
          Theme lives in the header switch. Interim portrait; the photo slot waits for the shoot.
          Share a state as a link:
          ?treatment=light&amp;side=right&amp;photo=plain&amp;door2=instagram
        </p>
      </div>
    </details>
  );
}

function Group<T extends string>({
  legend,
  name,
  value,
  options,
  onChange,
}: {
  legend: string;
  name: string;
  value: T;
  options: [T, string][];
  onChange: (v: T) => void;
}) {
  return (
    <fieldset className="proto-group">
      <legend>{legend}</legend>
      <div className="proto-opts">
        {options.map(([v, label]) => (
          <label key={v} data-checked={value === v}>
            <input
              type="radio"
              name={name}
              value={v}
              checked={value === v}
              onChange={() => onChange(v)}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
