import React from 'react';
import PageRouter from './common/router'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <PageRouter />
      </LocalizationProvider>
    </div>
  );
}

export default App;
