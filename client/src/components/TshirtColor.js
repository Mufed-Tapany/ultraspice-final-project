function TshirtColor({ onColorChange }) {
    return (
        <div className="colors">
            <h3>Choose T-Shirt color</h3>
            <button
                className="dot white"
                value="/white-t-shirt.jpeg"
                onClick={onColorChange}
            ></button>
            <button
                className="dot black"
                value="/black-t-shirt.jpeg"
                onClick={onColorChange}
            ></button>
            <button
                className="dot red"
                value="/red-t-shirt.jpeg"
                onClick={onColorChange}
            ></button>
            <button
                className="dot blue"
                value="/blue-t-shirt.jpeg"
                onClick={onColorChange}
            ></button>
            <button
                className="dot green"
                value="/green-t-shirt.jpeg"
                onClick={onColorChange}
            ></button>
            <button
                className="dot yellow"
                value="/yellow-t-shirt.jpeg"
                onClick={onColorChange}
            ></button>
        </div>
    );
}

export default TshirtColor;
