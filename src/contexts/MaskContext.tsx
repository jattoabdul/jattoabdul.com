'use client';

import React, { createContext, useContext, useCallback, ReactNode } from 'react';
import { MASK_SIZE } from '@/stores/maskStore';

export interface MaskConfig {
  initialSize?: number;
  hoverSize?: number;
  color?: string;
  enabled?: boolean;
  transitionDuration?: number;
  easing?: string;
}

interface MaskContextValue {
  config: MaskConfig;
  updateConfig: (newConfig: Partial<MaskConfig>) => void;
}

const defaultConfig: MaskConfig = {
  initialSize: MASK_SIZE.initial,
  hoverSize: MASK_SIZE.onHover,
  color: '#F2542D',
  enabled: true,
  transitionDuration: 0.5,
  easing: 'backOut',
};

const MaskContext = createContext<MaskContextValue | null>(null);

export function MaskProvider({
  children,
  initialConfig = {},
}: {
  children: ReactNode;
  initialConfig?: Partial<MaskConfig>;
}) {
  const [config, setConfig] = React.useState<MaskConfig>({
    ...defaultConfig,
    ...initialConfig,
  });

  const updateConfig = useCallback((newConfig: Partial<MaskConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  return <MaskContext.Provider value={{ config, updateConfig }}>{children}</MaskContext.Provider>;
}

export function useMask() {
  const context = useContext(MaskContext);
  if (!context) {
    throw new Error('useMask must be used within a MaskProvider');
  }
  return context;
}
