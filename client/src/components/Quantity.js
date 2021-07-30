function Quantity({
    quantity,
    onQuantityChange,
    incrementQuantity,
    decrementQuantity,
}) {
    return (
        <div className="quantity">
            <h3>Set the quantity</h3>
            <div className="product-quantity">
                <button className="quantity-left" onClick={decrementQuantity}>
                    &mdash;
                </button>
                <input
                    onChange={onQuantityChange}
                    className="quantity-input"
                    type="text"
                    value={quantity}
                    readOnly
                />
                <button className="quantity-right" onClick={incrementQuantity}>
                    &#xff0b;
                </button>
            </div>
        </div>
    );
}
export default Quantity;
