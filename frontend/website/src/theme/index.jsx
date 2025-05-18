import { createTheme } from '@mui/material/styles';
import palette from './pallette';
import transitions from './transitions';
// import typography from './typography';
// import breakpoints from './breakpoints';
// import customVariables from './customVariables';

const theme = createTheme({ 
  palette : palette,
  transitions : transitions,
  // breakpoints : breakpoints,
  // typography : typography,
  // custom : customVariables,
});
export default theme;