// import UploadedImage from "./UploadedImage";
// import { useState } from "react";
import Draggable from "react-draggable";

function Tshirt({ image, t_shirt, onDragImage, disabled }) {
    // const [position, setPosition] = useState({ x: 0, y: 0 });

    // const trackPos = (data) => {
    //     setPosition({ x: data.x, y: data.y });
    // };

    return (
        <div id="image-wrapper" className="editor-area">
            <div className="canvas-bg-wrapper">
                <img
                    className="t-shirt-background"
                    src={t_shirt}
                    alt="T-shirt"
                />
                <Draggable
                    bounds={{ top: -70, left: -31, right: 25, bottom: 190 }}
                    disabled={disabled}
                    onDrag={(e, data) => onDragImage(data)}
                >
                    <img
                        className="top"
                        src={image || "/default.jpg"}
                        alt="T-shirt"
                    />
                </Draggable>
            </div>
        </div>
    );
}

export default Tshirt;
