import { createTheme } from "@mui/material/styles";


export const colors = {
primary:'#fafafa',
orange:'#ff5722',
brown:'#795548',
pink:'#e91e63',
darkBlue:'#0a1930',
lightGrey:'#90a4ae',
reddish:'#fc5c7d',
black:'#0a1930',
red:'#d50000',
green:'#1b5e20',
teallight:'#b2dfdb',
darkred:'#c51162'

}

const theme = createTheme({
    palette:{
        primary:{
            main:colors.reddish
        }
    }
})

export const vendorTheme = createTheme({
    palette:{
        primary:{
            main:colors.darkred
        }
    },
    // typography: {
    //     allVariants: {
    //       color: "white"
    //     },
    //   },
})

export default theme;