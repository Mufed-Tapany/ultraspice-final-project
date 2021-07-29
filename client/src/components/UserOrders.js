import { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";

import axios from "../axios";

export default function UserOrders() {
    const [userOrders, setUserOrders] = useState([]);

    useEffect(async () => {
        const response = await axios.get("/api/orders");
        setUserOrders(response.data);
    }, []);

    function geOrders() {
        return userOrders.map((order) => {
            return (
                <li key={order.id}>
                    <p>
                        <strong>Order ID: </strong> {order.id}
                    </p>
                    <p>
                        <strong>Shipped to: </strong>
                        {order.shipping_first_name} {order.shipping_last_name}
                    </p>
                    <p>
                        <strong>Address: </strong> {order.street} {order.plz}{" "}
                        {order.city}
                    </p>
                    <p>
                        <strong>Order date: </strong> {order.created_at}
                    </p>
                </li>
            );
        });
    }

    return (
        <section className="orders-list">
            <div className="list-title">
                <h1>A list of your orders</h1>
            </div>

            <ul>{geOrders()}</ul>
        </section>
    );
}
