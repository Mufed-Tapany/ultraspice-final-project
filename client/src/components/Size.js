function Size({ value, onSizeChange }) {
    return (
        <div className="sizes">
            <h3>Choose the size</h3>
            <select
                onChange={onSizeChange}
                name="sizes"
                id="sizes"
                value={value}
            >
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>
        </div>
    );
}

export default Size;
