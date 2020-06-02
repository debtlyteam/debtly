import { createMuiTheme } from '@material-ui/core'

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#216869'

      // main: '#0044ff',
    },
    secondary: {
      // main: '#FC9F5B',
      light: '#0066ff',
      main: '#0044ff'
    }
  },
  spacing: 4
})

export default mainTheme
