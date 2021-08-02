import { Component } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: null,
            error: null,
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();
        axios
            .post("/api/login", this.state)
            .then((response) => {
                console.log("[login:data]", response.data);
                window.location = "/";
            })
            .catch((error) => {
                console.log("[ERROR:login]", error.response.data);
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
            <div className="login">
                <div className="registration-login-title">
                    <h1>Login</h1>

                    <Link to="/" className="login-link">
                        Click here to register
                    </Link>
                </div>
                <div className="registration-form">
                    <form
                        className="registration-form"
                        onSubmit={this.onFormSubmit}
                    >
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
                        <button type="submit">Login</button>
                        <div className="reset-password-div">
                            <Link
                                to="/password/reset/start"
                                className="reset-password"
                            >
                                Click here to reset your password
                            </Link>
                        </div>
                    </form>
                </div>

                {this.state.error && (
                    <p className="error">{this.state.error}</p>
                )}
            </div>
        );
    }
}
