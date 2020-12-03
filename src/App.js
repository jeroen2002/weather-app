import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Navigation from './components/Navigation';
// import StorageContentProvider from './providers/StorageContentProvider';




const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2B85C6',
  },
};

export default function App() {
  return (

    <PaperProvider theme={theme}>


      <Navigation />
    </PaperProvider>

  );
}
