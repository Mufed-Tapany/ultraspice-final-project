import { Component } from "react";
import axios from "../axios";
import { Link, Redirect } from "react-router-dom";
import { BrowserRouter, Route, HashRouter, Switch } from "react-router-dom";
import Tshirt from "./Tshirt";
import ImageUploader from "./ImageUploader";
import OrderProgress from "./OrderProgress";
import Size from "./Size";
import TshirtColor from "./TshirtColor";
import UserOrders from "./UserOrders";

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
                <header>
                    <div className="header-links">
                        <Link to="/orders">
                            <button className="header-button">Orders</button>
                        </Link>
                    </div>
                </header>
                <div className="progress-container">
                    <Route path="/" exact>
                        <Tshirt
                            image={this.state.order.image.url}
                            t_shirt={this.state.order.color}
                        />
                        <div className="progress-content">
                            <ImageUploader onUpload={this.onUpload} />
                            <Size
                                value={this.state.order.size}
                                onSizeChange={this.onSizeChange}
                            />
                            <TshirtColor onColorChange={this.onColorChange} />
                            <Link to="/order" className="or">
                                <button className="order-button">Order</button>
                            </Link>
                        </div>
                    </Route>
                </div>
                <Route path="/order">
                    <OrderProgress onOrderSubmit={this.onOrderSubmit} />
                </Route>
                <Route path="/orders">
                    <UserOrders />
                </Route>
            </BrowserRouter>
        );
    }
}

export default App;
