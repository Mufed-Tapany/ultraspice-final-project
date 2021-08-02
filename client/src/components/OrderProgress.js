import { Component } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

export default class OrderProgress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            shipping_first_name: "",
            shipping_last_name: "",
            street: "",
            plz: "",
            city: "",
        };
        this.onFirstStepFormSubmit = this.onFirstStepFormSubmit.bind(this);
        this.onSecondStepFormSubmit = this.onSecondStepFormSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onFirstStepFormSubmit(event) {
        event.preventDefault();
        this.setState({ step: 2 });
    }

    onSecondStepFormSubmit(event) {
        event.preventDefault();
        this.props.onOrderSubmit(this.state);
        this.setState({ step: 3 });
    }

    onInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    render() {
        if (this.state.step == 1) {
            return (
                <div className="adress">
                    <div className="adress-data">
                        <h3 className="address-data-title">
                            Enter shipping address
                        </h3>
                    </div>
                    <div className="registration-form">
                        <form
                            className="registration-form"
                            onSubmit={this.onFirstStepFormSubmit}
                        >
                            <label htmlFor="first_name">First Name</label>
                            <input
                                type="text"
                                name="shipping_first_name"
                                required
                                onChange={this.onInputChange}
                            />
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                type="text"
                                name="shipping_last_name"
                                required
                                onChange={this.onInputChange}
                            />
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
                            <div className="order-btns">
                                <button type="submit">Next</button>
                                <button className="go-back-btn-div">
                                    <Link to="/" className="go-back-btn">
                                        Go Back
                                    </Link>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
        if (this.state.step == 2) {
            return (
                <div className="submit-order">
                    <div className="submit-order-title">
                        <h3>
                            Click <strong>Submit order</strong> to complete and
                            close your order
                        </h3>
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
                <div className="order-done">
                    <h3>Thank you! Your order has been successfully sent</h3>
                    <p>
                        Continue{" "}
                        <Link to="/" className="register-link">
                            shopping
                        </Link>{" "}
                    </p>
                </div>
            );
        }
    }
}
