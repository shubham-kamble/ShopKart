import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import OrderedProduct from './OrderedProduct';

function Orders(props) {

    var [orders, setOrders] = useState([]);

    useEffect(() => {
        var fetchOrders = async () => {
            var { data } = await Axios.get("http://localhost:5002/api/getorders/" + localStorage.getItem("userid"));
            setOrders(data);
        }
        fetchOrders();
    }, []);

    if (localStorage.getItem("jwtToken") === null) {
        return <div style={{height:'80vh'}}>Please Login </div>
    } else {
        return <div className="outerbox">
            <table className="table table-light table-striped table-hover">
                <thead>
                    <tr>
                        <th className="order-prod">ID</th>
                        <th className="order-prod">Products</th>
                        <th className="order-price">Total Price</th>
                        <th className="order-date">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order,index) =>
                            <tr>
                                <td style={{width:'100px'}}>{index+1}</td>
                                <td >{
                                    order.orderItems.map(
                                        x => <OrderedProduct id={x}></OrderedProduct>
                                    )}
                                </td>
                                <td>₹ {order.totalPrice}</td>
                                <td>{order.orderedDate.split('T')[0]}</td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>

    }

}


export default Orders;