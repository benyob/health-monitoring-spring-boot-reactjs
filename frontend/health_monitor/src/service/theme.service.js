export const colsGraph = [
    '#8ac4d0',
    '#282846',
    '#007580',
    '#19496A',
    '#f39189',
    '#38A0EA',
    '#ac0d0d',
    '#ff005c',
    '#fff600',
    '#fed049',
    '#f25287',
    '#00917c',
    '#',
]
export const cols = {

    veryLight_blue: '#EFF7FD',
    light_blue: '#60BBFB',
    blue: '#38A0EA',
    dark_blue: '#19496A',
    unclear_white: '#F3F6F9',
    black: '#052135',
    white: 'white',
    gray: '#879BAA',
    red: '#EA3838',
}

export const themes = {
    light: {
        authContainer: {
            transition: 'background-color 1s',
            backgroundColor: cols.white,
            boxShadow: "0 0 .5rem rgba(0,0,0,.4)"
        },
        authInput: {
            transition: 'background-color 1s',
            backgroundColor: cols.veryLight_blue,
            color: cols.dark_blue,
            border: "none",
        }
        ,
        bg_blueBlack: {
            transition: 'background-color 1s',
            backgroundColor: cols.blue,
        }
        ,
        bg_veryLightBlueDarkBlue: {
            transition: 'background-color 1s',
            backgroundColor: cols.veryLight_blue,
        }
        ,
        col_veryLightBlueDarkBlue: {
            color: cols.veryLight_blue,
        }
        ,
        col_darkBlueVeryLightBlue: {
            color: cols.dark_blue,
        }
        ,
        col_blackWhite: {
            color: cols.black,
        }
        ,
        col_whiteBlack: {
            color: cols.white
        }
    },
    dark: {
        authContainer: {
            transition: 'background-color 1s',
            backgroundColor: cols.black,
            boxShadow: "0 0 .5rem rgba(255,255,255,.4)"

        }
        ,
        authInput: {
            transition: 'all 1s',
            backgroundColor: cols.black,
            color: cols.veryLight_blue,

            borderBottom: "1px solid gray",
            borderBottomLeftRadius: '0',
            borderBottomRightRadius: '0',


        }
        ,
        bg_blueBlack: {
            transition: 'background-color 1s',
            backgroundColor: cols.black,
        }
        ,
        bg_veryLightBlueDarkBlue: {
            transition: 'background-color 1s',
            backgroundColor: cols.dark_blue,
        }
        ,
        col_veryLightBlueDarkBlue: {
            color: cols.dark_blue,
        }
        ,
        col_darkBlueVeryLightBlue: {
            color: cols.veryLight_blue,
        }
        ,
        col_blackWhite: {
            color: cols.white,
        }
        ,
        col_whiteBlack: {
            color: cols.black,
        }
    }

}


class ThemeService {
    setLightTheme() {
        localStorage.setItem('theme', 'light')
    }
    setDarkTheme() {
        localStorage.setItem('theme', 'dark')
    }
    getTheme() {
        let t;
        t = localStorage.getItem('theme');
        t = t !== null ? t : 'light'

        return t === 'light' ? themes.light : themes.dark

    }
}
export default new ThemeService()
