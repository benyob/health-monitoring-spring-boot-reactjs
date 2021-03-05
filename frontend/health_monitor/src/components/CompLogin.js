import React from 'react'
import AuthService from "../service/auth.service";

export default class CompLogin extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
            message: ""
        };
    }

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

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        AuthService.login(this.state.username, this.state.password).then(
            () => {
                this.props.history.push("/profile");
                window.location.reload();
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


    render() {

        return (
            <div>
                <form onSubmit={this.handleLogin}>
                    Username
                <input type="text" name="username"
                        value={this.state.username}
                        onChange={this.onChangeUsername} />
                    <br />
                Password
                <input type="Password" name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword} />
                    <br />
                    <input type="submit" value="Login" onSubmit={this.handleLogin} disabled={this.state.loading}
                    /><br />

                    <div>
                        <p>
                            {this.state.message}
                        </p>
                    </div>
                </form>
            </div>
        )
    }
}
