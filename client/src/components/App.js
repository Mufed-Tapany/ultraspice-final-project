import { Component } from "react";
import axios from "../axios";
import { Link, Redirect } from "react-router-dom";
import { BrowserRouter, Route, HashRouter, Switch } from "react-router-dom";
import Tshirt from "./Tshirt";
import ImageUploader from "./ImageUploader";
import OrderProgress from "./OrderProgress";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            order: {
                size: "",
                quantity: 1,
                color: "/white-t-shirt.jpeg",
                image: {},
            },
            //t_shirt: "/white-t-shirt.jpeg",
        };
        this.onUpload = this.onUpload.bind(this);
        this.onOrderSubmit = this.onOrderSubmit.bind(this);
        this.onSizeChange = this.onSizeChange.bind(this);
        this.onColorChange = this.onColorChange.bind(this);
    }

    componentDidMount() {
        axios.get("/api/user", this.state).then((response) => {
            this.setState({
                id: response.data.id,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
            });
        });
    }

    onUpload(image) {
        this.setState({
            order: {
                ...this.state.order,
                image,
            },
        });
    }

    onSizeChange(event) {
        this.setState({
            order: {
                ...this.state.order,
                size: event.target.value,
            },
        });
    }

    onColorChange(event) {
        this.setState({
            order: {
                ...this.state.order,
                color: event.target.value,
            },
        });
    }

    onOrderSubmit(data) {
        console.log("data", data);
        axios.post("/orders", { ...this.state.order, ...data });
    }

    render() {
        return (
            <BrowserRouter>
                <header></header>
                <div className="progress-container">
                    <Route path="/" exact>
                        <Tshirt
                            image={this.state.order.image.url}
                            t_shirt={this.state.order.color}
                        />
                        <div className="progress-content">
                            <ImageUploader onUpload={this.onUpload} />
                            <div className="sizes">
                                <h3>Choose the size</h3>
                                <select
                                    onChange={this.onSizeChange}
                                    name="sizes"
                                    id="sizes"
                                    value={this.state.order.size}
                                >
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </select>
                            </div>
                            <div className="colors">
                                <h3>Choose T-Shirt color</h3>
                                <button
                                    className="dot white"
                                    value="/white-t-shirt.jpeg"
                                    onClick={this.onColorChange}
                                ></button>
                                <button
                                    className="dot black"
                                    value="/black-t-shirt.jpeg"
                                    onClick={this.onColorChange}
                                ></button>
                                <button
                                    className="dot red"
                                    value="/red-t-shirt.jpeg"
                                    onClick={this.onColorChange}
                                ></button>
                                <button
                                    className="dot blue"
                                    value="/blue-t-shirt.jpeg"
                                    onClick={this.onColorChange}
                                ></button>
                                <button
                                    className="dot green"
                                    value="/green-t-shirt.jpeg"
                                    onClick={this.onColorChange}
                                ></button>
                                <button
                                    className="dot yellow"
                                    value="/yellow-t-shirt.jpeg"
                                    onClick={this.onColorChange}
                                ></button>
                            </div>
                            <Link to="/order" className="or">
                                <button className="order-button">Order</button>
                            </Link>
                        </div>
                    </Route>
                </div>
                <Route path="/order">
                    <OrderProgress onOrderSubmit={this.onOrderSubmit} />
                </Route>
            </BrowserRouter>
        );
    }
}

export default App;
