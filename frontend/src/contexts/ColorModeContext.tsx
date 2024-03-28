import React from 'react';
import { PaletteMode } from '@mui/material';

interface IColorModeContext {
  toggleColorMode: () => void;
  mode: PaletteMode;
}

const ColorModeContext = React.createContext<IColorModeContext>({
  toggleColorMode: () => {},
  mode: 'light', // default value
});

export default ColorModeContext;
