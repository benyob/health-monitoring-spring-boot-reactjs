import React, { Component } from "react";

import UserService from "../service/user.service";

export default class DashboardAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getAdminBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <div>
                <header>
                    <h3>{this.state.content}</h3>
                </header>
            </div>
        );
    }
}