import React from 'react'
import AuthService from "../service/auth.service";
import '../component/CompAuth.css'
import ic_logo from '../Exported Assets/logo.svg'
import ic_face from '../Exported Assets/ic_face_login.svg'
import ic_username from '../Exported Assets/ic_user_login.svg'
import ic_password from '../Exported Assets/ic_lock_login.svg'
import ic_btn_login from '../Exported Assets/ic_btn_login.svg'
import ic_btn_register from '../Exported Assets/ic_btn_register.svg'
import ic_email from '../Exported Assets/ic_email_register.svg'
import ic_theme from '../Exported Assets/ic_pallet.svg'
import ic_moon from '../Exported Assets/ic_moon.svg'
import ic_sun from '../Exported Assets/ic_sun.svg'
import ic_earth from '../Exported Assets/ic_earth.svg'

import { Spring } from 'react-spring/renderprops'

import ThemeService from '../service/theme.service'
import languageService from '../service/language.service';
import themeService from '../service/theme.service';


export default class CompAuth extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.set_Dark_theme=this.set_Dark_theme.bind(this)
        this.set_Light_theme=this.set_Light_theme.bind(this)
        this.state = {
            username: "",
            password: "",
            email: "",
            loading: false,
            message: "",
            isRegistering: false,
            isThemeDrawer: false,
            isLanguageDrawer: false,
        };
    }

    //#region Auth methods
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    handleLogin(e) {

        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        AuthService.login(this.state.username, this.state.password).then(
            () => {
                this.props.history.push("/dashboard/charts/blood");
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    loading: false,
                    message: resMessage
                });
            }
        );


    }
    handleRegister(e) {
        e.preventDefault();


        this.setState({
            message: "",
            successful: false
        });

        AuthService.register(
            this.state.username,
            this.state.email,
            this.state.password
        ).then(
            response => {
                this.setState({
                    message: response.data.message,
                    successful: true
                });
                AuthService.login(this.state.username, this.state.password).then(
                    () => {
                        this.props.history.push("/dashboard/charts/blood");
                        //window.location.reload();
                    },
                    error => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();

                        this.setState({
                            loading: false,
                            message: resMessage
                        });
                    }
                );
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    successful: false,
                    message: resMessage
                });
            }
        );

    }
    //#endregion

    set_Dark_theme() {
        themeService.setDarkTheme();
        this.props.updateTheme();
    }

    set_Light_theme() {
        themeService.setLightTheme();
        this.props.updateTheme();
    }

    render() {
        const getText = (t) => {
            return languageService.getText(t)
        }
        
        const theme = this.props.theme;

        const style_drawerTheme = {
            left: `${this.state.isThemeDrawer ? ('auto') : ('15rem')}`,
        }
        const style_drawerLanguage = {
            left: `${this.state.isLanguageDrawer ? ('auto') : ('15rem')}`,
        }
        
        return (

            <div style={theme.bg_blueBlack} className="auth-container">
                <Spring
                    from={{ opacity: 0, marginTop: -200 }}
                    to={{ opacity: 1, marginTop: 0 }}>
                    {props => (
                        <div style={props ,theme.authContainer} className="login-container">
                            <div className="auth-logo" >
                                <img src={ic_logo} alt="" />
                            </div>
                            <div className="login-form" >
                                <img src={ic_face} alt="" />
                                <div  className="login-inputs">

                                    <div className="input-auth-container">
                                        <img src={ic_username} className="icon-auth" alt="" />
                                        <input style={theme.authInput} type="text" className="input-auth" placeholder={getText("username") + " ..."}
                                            value={this.state.username}
                                            onChange={this.onChangeUsername} autocomplete="nope"/>
                                    </div>

                                    <div className="input-auth-container">
                                        <img src={ic_password} className="icon-auth" alt="" />
                                        <input style={theme.authInput} type="password" className="input-auth" placeholder={getText("password") + " ..."}
                                            value={this.state.password}
                                            onChange={this.onChangePassword} />
                                    </div>

                                    {this.state.isRegistering ? (
                                        <div className="input-auth-container">
                                            <img src={ic_email} className="icon-auth" alt="" />
                                            <input style={theme.authInput} type="text" className="input-auth" placeholder={getText("email") + " ..."}
                                                value={this.state.email}
                                                onChange={this.onChangeEmail} autocomplete="nope"/>
                                        </div>
                                    ) : (
                                        <></>
                                    )
                                    }

                                </div>
                                <div className="btns-auth-container">
                                    {!this.state.isRegistering ? (
                                        <div className="btns-auth-container-p"
                                            onClick={() => this.setState({ isRegistering: true })}><p>{getText("I don't have an account.")}</p></div>
                                    ) : (
                                        <div className="btns-auth-container-p"
                                            onClick={() => this.setState({ isRegistering: false })}><p>{getText("I already have an account.")}</p></div>
                                    )}
                                    {
                                        this.state.isRegistering ? (
                                            <div style={theme.bg_veryLightBlueDarkBlue} className="btn-auth" onClick={this.handleRegister}>
                                                <img src={ic_btn_register} alt="" />
                                                <p>{getText("Register")}</p>
                                            </div>
                                        ) : (
                                            <div style={theme.bg_veryLightBlueDarkBlue} className="btn-auth" onClick={this.handleLogin} disabled={this.state.loading}>
                                                <img src={ic_btn_login} alt="" />
                                                <p> {getText("Login")}</p>
                                            </div>

                                        )
                                    }
                                </div>
                            </div>
                            <div className="auth-extra">

                                <div className="drawer">
                                    <div className="drawer-logo" onClick={() => { this.setState({ isLanguageDrawer: !this.state.isLanguageDrawer }) }}>
                                        <img src={ic_earth} className="drawer-icon" alt="" />
                                    </div>
                                    <div className='drawer-content' style={style_drawerLanguage}>
                                        <div onClick={languageService.setArLanguage} className="drawer-btn">
                                            <p>ع</p>
                                        </div>
                                        <div  onClick={languageService.setFrLanguage} className="drawer-btn">
                                            <p>fr</p>
                                        </div>
                                        <div  onClick={languageService.setEngLanguage} className="drawer-btn">
                                            <p>en</p>
                                        </div>
                                    </div>

                                </div>

                                <div className="drawer">
                                    <div className="drawer-logo" onClick={() => { this.setState({ isThemeDrawer: !this.state.isThemeDrawer }) }}>
                                        <img src={ic_theme} className="drawer-icon" alt="" />
                                    </div>
                                    <div className='drawer-content' style={style_drawerTheme}>
                                        <div className="drawer-btn" onClick={this.set_Dark_theme}>
                                            <img src={ic_moon} className="drawer-icon" alt="" />
                                        </div>
                                        <div className="drawer-btn" onClick={this.set_Light_theme}>
                                            <img src={ic_sun} className="drawer-icon" alt="" />
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className="error-message">
                                <span>{this.state.message}</span>
                            </div>
                        </div>
                    )}
                </Spring>

            </div>
        )

    }
}
