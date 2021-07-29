import { useState, useEffect } from "react";
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
                        Shipped to {order.shipping_first_name}{" "}
                        {order.shipping_last_name}
                    </p>
                    <p>
                        Address {order.street} {order.plz} {order.city}
                    </p>
                    <p>Orderd on {order.created_at}</p>
                </li>
            );
        });
    }

    return (
        <section className="recent-users">
            <h4>Your orders</h4>
            <ul>{geOrders()}</ul>
        </section>
    );
}
