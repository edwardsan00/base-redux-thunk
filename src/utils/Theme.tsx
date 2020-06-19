import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles'
import { Shadows } from "@material-ui/core/styles/shadows"

// Create a theme instance.
const theme = unstable_createMuiStrictModeTheme({
  shadows: Array(25).fill("none") as Shadows
})

export default theme
