function Tshirt({ image, t_shirt }) {
    return (
        <div id="image-wrapper" className="editor-area">
            <div className="canvas-bg-wrapper">
                <img
                    className="t-shirt-background"
                    src={t_shirt}
                    alt="T-shirt"
                />
                <img
                    className="top"
                    src={image || "/default.jpg"}
                    alt="T-shirt"
                />
            </div>
        </div>
    );
}

export default Tshirt;
