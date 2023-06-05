import {createTheme, responsiveFontSizes} from '@mui/material'
const primaryMainColor = '#91A7CD';
const secondaryMainColor = '#C4D4E2'

const successMainColor = '#F89F6A'
const backGroundColor = '#fafafa'

const primaryText = '#000000e0'
const secondaryText = '#a1a1a1'

// black for text #00000099 smoke black
// gray #CED3DC

let materialTheme = createTheme({
  palette: {
    primary: {
      main: primaryMainColor
    },
    secondary: {
      main: secondaryMainColor
    },
    success: {
      main: successMainColor
    },
    background: {
      default: backGroundColor
    },
    text: {
      primary: primaryText,
      secondary: secondaryText
    }
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none'
        }
      }
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: secondaryMainColor,
          '& .Mui-completed': {
            color: successMainColor,
          },
          '& .Mui-active': {
            color: successMainColor,
          },
        }
      }
    }
  }
})

materialTheme = responsiveFontSizes(materialTheme);
export default materialTheme;
