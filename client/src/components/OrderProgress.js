import { Component } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

export default class OrderProgress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            email: "",
            first_name: "",
            last_name: "",
            street: "",
            plz: "",
            city: "",
        };
        this.onFirstStepFormSubmit = this.onFirstStepFormSubmit.bind(this);
        this.onSecondStepFormSubmit = this.onSecondStepFormSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    // firsOrdertStep(event) {
    //     event.preventDefault();
    //     axios.post("/order", this.state).then((response) => {
    //         console.log("[/order]", response.data);
    //     });
    // }

    onFirstStepFormSubmit(event) {
        event.preventDefault();
        axios
            .post("/order/start", this.state)
            .then((response) => {
                console.log("[/order/start:data]", response.data);
                this.setState({ step: 2 });
            })
            .catch((error) => {
                console.log("[ERROR:/order/start]", error.response.data);
            });
    }

    onSecondStepFormSubmit(event) {
        event.preventDefault();
        axios
            .post("/order/verify", this.state)
            .then((response) => {
                console.log("[/order/verify:data]", response.data);
                this.setState({ step: 3 });
            })
            .catch((error) => {
                console.log("[ERROR:/order/verify]", error.response.data);
                //return this.setState({ error: error.response.data.error });
            });
    }

    onInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    render() {
        // if (this.state.step == 1) {
        //     return (
        //         <div>
        //             <button onClick={this.firsOrdertStep}>Order</button>
        //         </div>
        //     );
        // }
        if (this.state.step == 1) {
            return (
                <div className="login">
                    <div className="reset-pass-title">
                        <h3 className="reset-pass-text">Enter your Data</h3>
                    </div>
                    <div className="registration-form">
                        <form
                            className="registration-form"
                            onSubmit={this.onFirstStepFormSubmit}
                        >
                            {/* <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                onChange={this.onInputChange}
                            />
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
                            /> */}
                            <label htmlFor="street">Address</label>
                            <input
                                type="text"
                                name="street"
                                required
                                onChange={this.onInputChange}
                            />
                            <label htmlFor="plz">PLZ</label>
                            <input
                                type="number"
                                name="plz"
                                required
                                onChange={this.onInputChange}
                            />
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                name="city"
                                required
                                onChange={this.onInputChange}
                            />
                            <button type="submit">Next</button>
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
                            <button type="submit">Submit order</button>
                        </form>
                    </div>
                </div>
            );
        }
        if (this.state.step == 3) {
            return (
                <div>
                    <p>Your order has been successfully sent</p>
                    <p>
                        {/* You can{" "}
                        <Link to="/login" className="register-link">
                            Login
                        </Link>{" "}
                        again */}
                    </p>
                </div>
            );
        }
    }
}
