import { useState, useEffect } from "react";
import axios from "../axios";
import moment from "moment";

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
                        <strong>Order date: </strong>{" "}
                        <time>{moment(order.created_at).fromNow()}</time>
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
