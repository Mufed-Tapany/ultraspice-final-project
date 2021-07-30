import { Component } from "react";
import axios from "../axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Tshirt from "./Tshirt";
import ImageUploader from "./ImageUploader";
import OrderProgress from "./OrderProgress";
import Size from "./Size";
import TshirtColor from "./TshirtColor";
import UserOrders from "./UserOrders";
import Quantity from "./Quantity";

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
                position: {
                    x: 0,
                    y: 0,
                },
            },
        };
        this.onUpload = this.onUpload.bind(this);
        this.onOrderSubmit = this.onOrderSubmit.bind(this);
        this.onSizeChange = this.onSizeChange.bind(this);
        this.onColorChange = this.onColorChange.bind(this);
        this.incrementQuantity = this.incrementQuantity.bind(this);
        this.decrementQuantity = this.decrementQuantity.bind(this);
        this.onDragImage = this.onDragImage.bind(this);
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

    incrementQuantity() {
        this.setState({
            order: {
                ...this.state.order,
                quantity: this.state.order.quantity + 1,
            },
        });
    }

    decrementQuantity() {
        this.setState({
            order: {
                ...this.state.order,
                quantity:
                    this.state.order.quantity > 0
                        ? this.state.order.quantity - 1
                        : 1,
            },
        });
    }

    onQuantityChange(event) {
        this.setState({
            order: {
                ...this.state.order,
                quantity: event.target.value,
            },
        });
    }

    onDragImage(data) {
        this.setState({
            order: {
                ...this.state.order,
                position: {
                    x: data.x,
                    y: data.y,
                },
            },
        });
    }

    onXDimensionChange(event) {
        this.setState({
            position: {
                ...this.state.order.position,
                x: event.target.value,
            },
        });
    }

    onYDimensionChange(event) {
        this.setState({
            position: {
                ...this.state.order.position,
                y: event.target.value,
            },
        });
    }

    render() {
        return (
            <BrowserRouter>
                <section>
                    <header>
                        <div className="header-links">
                            <Link to="/">
                                <button className="header-button">Home</button>
                            </Link>
                            <Link to="/orders">
                                <button className="header-button">
                                    Orders
                                </button>
                            </Link>
                        </div>
                        <img className="logo" src="/logo.jpg" />
                    </header>
                    <div className="progress-container">
                        <Route path="/" exact>
                            <Tshirt
                                image={this.state.order.image.url}
                                t_shirt={this.state.order.color}
                                onDragImage={this.onDragImage}
                                x={this.state.order.position.x}
                                y={this.state.order.position.y}
                                onXDimensionChange={this.onXDimensionChange}
                                onYDimensionChange={this.onYDimensionChange}
                            />
                            <div className="progress-content">
                                <ImageUploader onUpload={this.onUpload} />
                                <TshirtColor
                                    onColorChange={this.onColorChange}
                                />
                                <Size
                                    value={this.state.order.size}
                                    onSizeChange={this.onSizeChange}
                                />
                                <Quantity
                                    quantity={this.state.order.quantity}
                                    onQuantityChange={this.onQuantityChange}
                                    incrementQuantity={this.incrementQuantity}
                                    decrementQuantity={this.decrementQuantity}
                                />
                                <Link to="/order" className="or">
                                    <button className="order-button">
                                        Order
                                    </button>
                                </Link>
                            </div>
                        </Route>
                    </div>
                </section>
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
