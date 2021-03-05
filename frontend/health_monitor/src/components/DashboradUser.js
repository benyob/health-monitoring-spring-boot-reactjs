import React, { Component } from "react";

import UserService from "../service/user.service";
import AuthService from "../service/auth.service"
export default class DashboardUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            dataBloodPressure: []

        };
    }

    componentDidMount() {
        UserService.getUserBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            () => {
                this.setState({
                    content:""
                });
                this.props.history.push("/");
            }
        );
        // see if we are already logged in
        const user = AuthService.getCurrentUser();
        if (user) {

            UserService.getBloodPressure(user.id).then(
                response => {
                    this.setState({
                        dataBloodPressure: response.data
                    });
                    console.log(this.state.dataBloodPressure);
                }
            );
        }
    }

    render() {

        // const bloodpressure = this.state.bloodpressure.map(d=>{
        //     return(
        //         <div key={d.id}>
        //             <p>{d.}</p>
        //         </div>
        //     )
        // })
        return (
            <div>
                <header>
                    <h3>{this.state.content}</h3>
                </header>
            </div>
        );
    }
}