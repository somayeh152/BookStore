import React from 'react';
import Wrapper from '../../hoc/Wrapper';
import Controls from '../../components/Controls/Controls'
import Modal from '../../components/UI/Modal/Modal';
import Order from '../../components/Order/Order';
import Loader from '../../components/UI/Loader/Loader';
import axios from '../../axios-orders';

const prices= {
    product1: 50,
    product2: 169,
    product3: 82,
}
class Shopping extends React.Component{
    state={
        products: null,
        totalPrice: 0,
        purchased: false,
        loading: false
    }

    componentDidMount(){
        axios.get('https://react-redux-main-28d7a.firebaseio.com/products.json')
        .then(response => {
            this.setState({
                products: response.data
            })
        })
    }

    addProductHandler = (type) => {
        const prevCount = this.state.products[type];
        const updatedCount = prevCount+1
        const updatedProducts = {
            ...this.state.products,
        }
        updatedProducts[type] = updatedCount

        const priceAdd = prices[type]
        const prevPrice = this.state.totalPrice
        const newPrice = prevPrice + priceAdd

        this.setState({
            products: updatedProducts , totalPrice: newPrice
        })
    }

    removeProductHandler = (type) => {
        const prevCount = this.state.products[type];
        const updatedCount = prevCount-1
        const updatedProducts = {
            ...this.state.products,
        }
        updatedProducts[type] = updatedCount

        const priceSub = prices[type]
        const prevPrice = this.state.totalPrice
        const newPrice = prevPrice - priceSub

        this.setState({
            products: updatedProducts , totalPrice: newPrice
        })
    }

    purchasedHandler = () => {
        this.setState({
            purchased: true
        })
    }

    modalCloseHandler = () => {
        this.setState({
            purchased: false
        })
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true})
        const order = {
            products: this.state.products,
            prise: this.state.totalPrice,
            costumer: {
                name:'somaye',
                email: 'somaye@google.com'
            }
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false, purchased: false})
            console.log(response)
        })
        .catch(err => {
            this.setState({loading: false, purchased: false})
            console.log(err)
        })
    }

    render(){

        let order = null; 

        if(this.state.loading){
            order = <Loader />
        }

        let controls = <Loader/>
        if(this.state.products){
            controls = (
                <Controls 
                    addproduct={this.addProductHandler} 
                    removeproduct={this.removeProductHandler} 
                    totalPrice = {this.state.totalPrice}
                    order = {this.purchasedHandler}
                />
            )
            order = <Order 
                        products={this.state.products} 
                        continue={this.purchaseContinueHandler} 
                        cancle={this.modalCloseHandler} 
                        totalPrice = {this.state.totalPrice}
                    />
        }
        
        return(
            <Wrapper>
                <Modal show={this.state.purchased} modalClose={this.modalCloseHandler}>
                    {order}
                    {/* {this.state.loading ? <Loader /> : `${order}`} */}
                </Modal>
                {controls}
            </Wrapper>
        )
    }
}

export default Shopping;