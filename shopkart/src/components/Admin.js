import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import Axios from 'axios';

export default function Admin() {
    const [cols, setCols] = useState({
        columns: [
            { title: 'Product Name', field: 'name' },
            { title: 'Description', field: 'desc' },
            { title: 'Price', field: 'price', type: 'numeric' },
            { title: 'Image', field: 'image' },
            { title: 'Category', field: 'category' },
        ]
    });

    const [products, setProducts] = useState([]);

    useEffect(() => {
        var fetchProd = async () => {
            var { data } = await Axios.get("http://localhost:5001/api/products/");
            setProducts({ data: data });
        }
        fetchProd();
    }, []);

    return (
        <MaterialTable
            title="Products List"
            columns={cols.columns}
            data={products.data}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                        Axios.post("http://localhost:5003/api/addproduct/",newData).then(resp => {
                                alert("Product Added successfully!");
                                });
                            setProducts((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            Axios.put("http://localhost:5003/api/updateproduct/"+oldData._id,newData).then(resp => {
                                alert("Updated successfully!");
                                });
                            if (oldData) {
                                setProducts((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            Axios.delete("http://localhost:5003/api/deleteproduct/"+oldData._id).then(resp => {
                            alert("deleted successfully!");
                            });
                            setProducts((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
    );
}
