import { Component } from "react";
import axios from "../axios";
import { Link, Redirect } from "react-router-dom";
import Tshirt from "./Tshirt";
import ImageUploader from "./ImageUploader";

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
            <div className="prog-container">
                <h1>B&B</h1>
                <Tshirt image={this.state.image} />
                <div>
                    <ImageUploader onUpload={this.onUpload} />
                </div>
            </div>
        );
    }
}

export default App;
