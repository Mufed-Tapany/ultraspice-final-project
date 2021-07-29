import { Component } from "react";
import axios from "../axios";

class ImageUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", this.state.file);
        axios.post("/api/upload_picture", formData).then((response) => {
            console.log("post:/api/upload_picture", response.data);
            this.props.onUpload(response.data);
        });
    }
    onChange(event) {
        console.log("[file]", event.target.files[0]);
        this.setState({ file: event.target.files[0] });
    }
    render() {
        return (
            <div className="image-uploader">
                <div className="image-uploader-content">
                    <h3>Choose an image you want to print</h3>
                    <form
                        className="upload-form"
                        method="POST"
                        action="/api/upload_picture"
                        encType="multipart/form-data"
                        onSubmit={this.onSubmit}
                    >
                        <label>
                            Choose image
                            <input
                                type="file"
                                accept="image/*"
                                required
                                onChange={this.onChange}
                            />
                        </label>
                        <button className="submit-button" type="submit">
                            Upload image
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ImageUploader;
