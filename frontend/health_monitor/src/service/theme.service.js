import ic_arrow_left from '../Exported Assets/ic_left_arrow.svg'
import ic_delete from '../Exported Assets/ic_delete.svg'
import ic_edit from '../Exported Assets/ic_edit.svg'
import ic_check from '../Exported Assets/ic_check.svg'
import ic_x from '../Exported Assets/ic_x.svg'
import ic_bar from '../Exported Assets/ic_bar.svg'
import ic_line from '../Exported Assets/ic_navbar_charts.svg'
import ic_search from '../Exported Assets/ic_navbar_search.svg'
import ic_search_white from '../Exported Assets/ic_search_white.svg'
import ic_to_right from '../Exported Assets/ic_to_right.svg'
import ic_arrow_upward from '../Exported Assets/ic_arrow_upward-1.svg'
import ic_arrow_downward from '../Exported Assets/ic_arrow_downward.svg'
import ic_customize from '../Exported Assets/ic_customize.svg'
import ic_general from '../Exported Assets/ic_general.svg'
export const colsRgba=
[
    "rgba(137, 196, 244,.6)",
    "rgba(228, 241, 254,.6)",
    "rgba(58, 83, 155, ,.6)",
    "rgba(241, 196, 15,.6)",
    "rgba(26, 188, 156,.6)",
    "rgba(155, 89, 182,.6)",
    "rgba(142, 68, 173,.6)",
    "rgba(231, 76, 60,.6)",
    "rgba(230, 126, 34,.6)",
    "rgba(211, 84, 0,.6)",
    "rgba(52, 231, 228,.6)",
    "rgba(255, 221, 89,.6)",
    "rgba(255, 192, 72,.6)",
    "rgba(0, 216, 214,.6)",
    "rgba(5, 196, 107,.6)",
]
export const icons = {
    ic_arrow_left,ic_search,ic_search_white,
    ic_delete,ic_to_right,
    ic_edit,ic_arrow_downward,ic_arrow_upward,
    ic_check,ic_general,ic_customize,
    ic_x,
    ic_bar,
    ic_line,
}

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
    warning: '#ff7171',
    alert: '#16c79a',
    advice: '#ffb037',
    dismiss:"#ce1212",
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
