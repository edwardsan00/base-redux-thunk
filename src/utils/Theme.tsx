import { createMuiTheme } from '@material-ui/core/styles'
import { Shadows } from "@material-ui/core/styles/shadows"

// Create a theme instance.
const theme = createMuiTheme({
  shadows: Array(25).fill("none") as Shadows
})

export default theme
