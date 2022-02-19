# reactApressMe

Readme.md

1 - Khi nao can dung prop function trong component-enfant

vi du trong component parent ProductDisplay va component enfant ProductEditor


1.1 - ProductDisplay.js Component parent

import React, { Component } from "react";
import { ProductTable } from "./ProductTable"
import { ProductEditor } from "./ProductEditor";

import { connect } from "react-redux";
import { saveProduct, deleteProduct } from "./store"
const mapStateToProps = (storeData) => ({
    products: storeData.products
})
const mapDispatchToProps = {
    saveCallback: saveProduct,
    deleteCallback: deleteProduct
}
const connectFunction = connect(mapStateToProps, mapDispatchToProps);
export const ProductDisplay = connectFunction(
    class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                showEditor: false,
                selectedProduct: null
            }
        }

        startEditing = (product) => {
            this.setState({ showEditor: true, selectedProduct: product })
        }

        createProduct = () => {
            this.setState({ showEditor: true, selectedProduct: {} })
        }

        cancelEditing = () => {
            this.setState({ showEditor: false, selectedProduct: null })
        }

        saveProduct = (product) => {
            this.props.saveCallback(product);
            this.setState({ showEditor: false, selectedProduct: null })
        }

        render() {
            if (this.state.showEditor) {
                return <ProductEditor
                    key={this.state.selectedProduct.id || -1}
                    product={this.state.selectedProduct}
                    saveCallback={this.saveProduct}
                    cancelCallback={this.cancelEditing} />
            } else {
                return <div className="m-2">
                    <ProductTable products={this.props.products}
                        editCallback={this.startEditing}
                        deleteCallback={this.props.deleteCallback} />
                    <div className="text-center">
                        <button className="btn btn-primary m-1"
                            onClick={this.createProduct}>
                            Create Product
                        </button>
                    </div>
                </div>
            }
        }
    }
)






1.2 - ProductEditor.js component enfant


import React, { Component } from "react";

export class ProductEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: {
                id: props.product.id || "",
                name: props.product.name || "", 
                category: props.product.category || "", 
                price: props.product.price || ""
            }
        }
    }

    handleChange = (ev) => {
        ev.persist();
        this.setState(state => state.formData[ev.target.name] =  ev.target.value);
    }

    handleClick = () => {
        this.props.saveCallback(this.state.formData);
    }

    render() {
        return <div className="m-2">
            <div className="form-group">
                <label>ID</label>
                <input className="form-control" name="id"
                    disabled
                    value={ this.state.formData.id }
                    onChange={ this.handleChange } />
            </div>
            <div className="form-group">
                <label>Name</label>
                <input className="form-control" name="name"
                    value={ this.state.formData.name }
                    onChange={ this.handleChange } />
            </div>            
            <div className="form-group">
                <label>Category</label>
                <input className="form-control" name="category"
                    value={ this.state.formData.category }
                    onChange={ this.handleChange } />
            </div>              
            <div className="form-group">
                <label>Price</label>
                <input className="form-control" name="price"
                    value={ this.state.formData.price }
                    onChange={ this.handleChange } />
            </div>                          
            <div className="text-center">
                <button className="btn btn-primary m-1" onClick={ this.handleClick }>
                    Save
                </button>
                <button className="btn btn-secondary" 
                        onClick={ this.props.cancelCallback }>
                    Cancel
                </button>                
            </div>
        </div>
    }
}


1.3 - ProductDisplay component parent don gian

saveProduct = (product) => {
            this.props.saveCallback(product);
            this.setState({ showEditor: false, selectedProduct: null })
        }

        render() {
            if (this.state.showEditor) {
                return <ProductEditor
                    key={this.state.selectedProduct.id || -1}
                    product={this.state.selectedProduct}
                    saveCallback={this.saveProduct}
                    cancelCallback={this.cancelEditing} />
            }


1.4 - ProductEditor Component enfant don gian

handleClick = () => {
        this.props.saveCallback(this.state.formData);
    }

 <button className="btn btn-primary m-1" onClick={ this.handleClick }>
                    Save
                </button>


1.5 - Khi nao  can dung prop function trong component-enfant ???

Khi ma component Parent ko co data de handle function o ngay niveau parent ma data lai nam o niveau component enfant vi du nhu data la mot form data dan phai saisir. Va xu li function thi lai can o niveau parent. Trong truong hop do thi can dung prop function trong component enfant. Neu function can dung parameter thi khi define function o component parent van khai parameter saveProduct = (product), o component enfant van goi parameter nhu form data chang han this.props.saveCallback(this.state.formData), nhung khi khai bao trong render thi ko can phai goi parameter va cung ko dung () vi du saveCallback={this.saveProduct}






