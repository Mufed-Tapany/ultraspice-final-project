import { Component } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            email: "",
        };
        this.onFirstStepFormSubmit = this.onFirstStepFormSubmit.bind(this);
        this.onSecondStepFormSubmit = this.onSecondStepFormSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onFirstStepFormSubmit(event) {
        event.preventDefault();
        console.log("Something");
        axios
            .post("/password/reset/start", this.state)
            .then((response) => {
                console.log("[/password/reset/start:data]", response.data);
                this.setState({ step: 2 });
            })
            .catch((error) => {
                console.log(
                    "[ERROR:/password/reset/start]",
                    error.response.data
                );
            });
    }
    onSecondStepFormSubmit(event) {
        event.preventDefault();
        console.log("Done");
        axios
            .post("/password/reset/verify", this.state)
            .then((response) => {
                console.log("[/password/reset/verify:data]", response.data);
                this.setState({ step: 3 });
            })
            .catch((error) => {
                console.log(
                    "[ERROR:/password/reset/verify]",
                    error.response.data
                );
                //return this.setState({ error: error.response.data.error });
            });
    }

    onInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    render() {
        if (this.state.step == 1) {
            return (
                <div className="login">
                    <div className="reset-pass-title">
                        <h3 className="reset-pass-text">
                            Enter your E-Mail address to reset your password
                        </h3>
                    </div>
                    <div className="registration-form">
                        <form
                            className="registration-form"
                            onSubmit={this.onFirstStepFormSubmit}
                        >
                            <label htmlFor="code">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                onChange={this.onInputChange}
                            />
                            <button type="submit">Save changes</button>
                        </form>
                    </div>
                </div>
            );
        }
        if (this.state.step == 2) {
            return (
                <div className="login">
                    <div className="registration-login-title">
                        <h1>Reset Password</h1>
                    </div>
                    <div className="registration-form">
                        <form
                            className="registration-form"
                            onSubmit={this.onSecondStepFormSubmit}
                        >
                            <label htmlFor="code">Code</label>
                            <input
                                type="text"
                                name="code"
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
                            <button type="submit">Save changes</button>
                        </form>
                    </div>
                </div>
            );
        }
        if (this.state.step == 3) {
            return (
                <div>
                    <p>Your password has been successfully reset</p>
                    <p>
                        You can{" "}
                        <Link to="/login" className="register-link">
                            Login
                        </Link>{" "}
                        again
                    </p>
                </div>
            );
        }
    }
}
