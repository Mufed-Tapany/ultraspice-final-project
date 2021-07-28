import { Component } from "react";
import axios from "../axios";
import { Link, Redirect } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
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
                <div className="prog-container">
                    <h1>B&B</h1>
                    <Tshirt image={this.state.image} />
                    <div>
                        <ImageUploader onUpload={this.onUpload} />
                        <Link to="/order/start" className="order-start">
                            <button>Order</button>
                        </Link>
                    </div>
                    <Route path="/order/start">
                        <OrderProgress />
                    </Route>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
