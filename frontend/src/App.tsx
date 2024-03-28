import React, { useState, useMemo, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline, PaletteMode } from '@mui/material';
import ColorModeContext from './contexts/ColorModeContext';
import getDesignTokens from './ColorPalette';
import Habits from './routes/Habits';

const App: React.FC = () => {
  const [mode, setMode] = useState<PaletteMode>('light');
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode]
  );

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme.palette.background.default]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className="App">
          <Navbar />
          <Routes>
            <Route path="/flexihabit/dashboard" element={<Habits />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
