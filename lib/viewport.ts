// Breakpoints específicos para dispositivos móviles
export const BREAKPOINTS = {
  xs: '320px',  // iPhone SE, Galaxy Fold
  sm: '375px',  // iPhone estándar
  md: '390px',  // iPhone Pro
  lg: '414px',  // iPhone Plus
  xl: '430px',  // iPhone Pro Max
} as const;

// Dimensiones seguras para elementos críticos
export const SAFE_DIMENSIONS = {
  minPadding: '16px',
  buttonBottomSpace: '96px', // 24px (safe area) + 72px (player height)
  modalPadding: '24px',
  maxContentWidth: 'calc(100vw - 32px)',
} as const;

// Z-index hierarchy
export const Z_LAYERS = {
  base: 0,
  overlay: 10,
  modal: 100,
  toast: 1000,
  floatingButton: 50,
} as const;
