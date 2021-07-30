import Draggable from "react-draggable";

function Tshirt({
    image,
    t_shirt,
    onDragImage,
    x,
    y,
    onXDimensionChange,
    onYDimensionChange,
}) {
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
                    onDrag={(e, data) => onDragImage(data)}
                >
                    <img
                        className="top"
                        src={image || "/default.jpg"}
                        alt="T-shirt"
                    />
                </Draggable>
                <div className="dimensions">
                    x{" "}
                    <input
                        type="text"
                        name="x"
                        value={x}
                        onChange={onXDimensionChange}
                    />{" "}
                    y{" "}
                    <input
                        type="text"
                        name="y"
                        value={y}
                        onChange={onYDimensionChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default Tshirt;
