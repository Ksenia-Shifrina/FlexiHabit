import React, { createContext, useContext } from 'react';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

// export const useColorMode = () => useContext(ColorModeContext);

export default ColorModeContext;
