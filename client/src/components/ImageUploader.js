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
            console.log(
                "DATA:before",
                this.props.onUpload(response.data.profilePicURL)
            );
            this.props.onUpload(response.data.profilePicURL);
        });
    }
    onChange(event) {
        console.log("[file]", event.target.files[0]);
        this.setState({ file: event.target.files[0] });
    }
    render() {
        return (
            <div className="profile-picture-uploader modal">
                <div className="modal-content form">
                    <h3>Choose a picture for your profile</h3>
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
