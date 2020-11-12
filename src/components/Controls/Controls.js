import React from 'react'
import './Controls.css'
import Builder from './Builder/Builder'

const products=[
    {title: 'product1' , type: 'product1'},
    {title: 'product2' , type: 'product2'},
    {title: 'product3' , type: 'product3'},
]

const Controls = (props) => {
    return (
        <div className="controls">
            <div className='price'>
                <p>Total Price: {props.totalPrice}</p>
            </div>
            {products.map(product=> {
                return <Builder 
                key={product.title} 
                title={product.title} 
                type={product.type} 
                add={() => props.addproduct(product.type)}
                remove={() => props.removeproduct(product.type)}
                />
            })}
            <button className='order-btn' onClick={props.order}>Order</button>
        </div>
    )
}

export default Controls;