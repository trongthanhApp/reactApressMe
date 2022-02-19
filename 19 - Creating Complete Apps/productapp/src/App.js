import React, { Component } from "react";
import ProductsAndSuppliers from "./ProductsAndSuppliers";
import { Provider } from "react-redux";
import dataStore from "./store";

export default class App extends Component {

    render() {
        return (
            <Provider store={dataStore}>
                <ProductsAndSuppliers />
            </Provider>
        )
    }
}
