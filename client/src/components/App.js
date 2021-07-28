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
            image: "",
        };
        this.onUpload = this.onUpload.bind(this);
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

    onUpload(newImage) {
        this.setState({
            image: newImage,
        });
    }

    render() {
        return (
            <BrowserRouter>
                <header></header>
                <div className="progress-container">
                    <Route path="/" exact>
                        <Tshirt image={this.state.image} />
                        <div className="progress-content">
                            <ImageUploader onUpload={this.onUpload} />
                            <div className="sizes">
                                <h3>Choose the size</h3>
                                <select name="sizes" id="sizes">
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </select>
                            </div>
                            <Link to="/order/start" className="order-start">
                                <button>Order</button>
                            </Link>
                        </div>
                    </Route>
                </div>
                <Route path="/order/start">
                    <OrderProgress />
                </Route>
            </BrowserRouter>
        );
    }
}

export default App;
