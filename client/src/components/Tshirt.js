let DEFAULT_IMAGE =
    "https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270";

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
                    src={image || DEFAULT_IMAGE}
                    alt="T-shirt"
                />
            </div>
        </div>
    );
}

export default Tshirt;
