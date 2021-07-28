import { Component } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();
        axios
            .post("/api/register", this.state)
            .then((response) => {
                console.log("[refister:data]", response.data);
                window.location = "/";
            })
            .catch((error) => {
                console.log("[ERROR:register]", error.response.data);
                return this.setState({ error: error.response.data.error });
            });
    }

    onInputChange(event) {
        this.setState({
            [event.target.name]: event.currentTarget.value,
        });
    }

    render() {
        return (
            <div className="registration">
                <div className="registration-login-title">
                    <h1>Registration</h1>
                    <Link to="/login" className="register-link">
                        Click here to Log in
                    </Link>
                </div>
                <div className="registration-form">
                    <form
                        className="registration-form"
                        onSubmit={this.onFormSubmit}
                    >
                        <label htmlFor="first_name">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            required
                            onChange={this.onInputChange}
                        />
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            required
                            onChange={this.onInputChange}
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            onChange={this.onInputChange}
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            onChange={this.onInputChange}
                        />

                        <button type="submit">Register</button>
                    </form>
                </div>
                {this.state.error_message && (
                    <p className="error">{this.state.error_message}</p>
                )}
            </div>
        );
    }
}
