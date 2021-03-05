import React, { Component } from 'react'
import AuthService from "../service/auth.service";

export default class CompRegister extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            successful: false,
            message: ""
        };
    }
    onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
      }
    
      onChangeEmail(e) {
        this.setState({
          email: e.target.value
        });
      }
    
      onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
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
    render() {
        return (
            <div>

                <form onSubmit={this.handleRegister}>
                    Username
                <input type="text" name="username" value={this.state.username}
                        onChange={this.onChangeUsername} /><br />
                Email
                <input type="text" name="email" value={this.state.email}
                        onChange={this.onChangeEmail} /><br />

                Password
                <input type="Password" name="password" value={this.state.password}
                        onChange={this.onChangePassword} /><br />

                    <input type="submit" value="Register" onSubmit={this.handleRegister} />
                    <br />
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
