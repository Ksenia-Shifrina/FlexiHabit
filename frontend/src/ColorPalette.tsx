import { PaletteMode } from '@mui/material';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          background: {
            default: '#FCFAF3'
          },
          primary: {
            main: '#F7F3E3',
            contrastText: '#635959',
          },
          secondary: {
            main: '#E7E2CE',
            contrastText: '#635959',
          },
          tags: {
            main: '#929090',
            contrastText: '#F7F3E3',
          },
          icons: {
            light: '#767676',
            dark: '#1E1E1E',
          },
          addButton: {
            main: '#D1CCB8'
          }
        }
      : {
          background: {
            default: '#4C4C4C'
          },
          primary: {
            main: '#929090',
            contrastText: '#F7F3E3',
          },
          secondary: {
            main: '#767676',
            contrastText: '#F7F3E3',
          },
          tags: {
            main: '#616161',
            contrastText: '#F7F3E3',
          },
          icons: {
            light: '#4C4C4C',
            dark: '#1E1E1E',
          },
          addButton: {
            main: '#929090'
          }
        }),
  },
});

export default getDesignTokens;
