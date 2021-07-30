function Quantity({
    quantity,
    onQuantityChange,
    incrementQuantity,
    decrementQuantity,
}) {
    return (
        <div className="quantity">
            <h3>Set the quantity</h3>
            <button
                className="quantity-input__modifier quantity-input__modifier--left"
                onClick={decrementQuantity}
            >
                &mdash;
            </button>
            <input
                onChange={onQuantityChange}
                className="quantity-input__screen"
                type="text"
                value={quantity}
                readOnly
            />
            <button
                className="quantity-input__modifier quantity-input__modifier--right"
                onClick={incrementQuantity}
            >
                &#xff0b;
            </button>
        </div>
    );
}
export default Quantity;
