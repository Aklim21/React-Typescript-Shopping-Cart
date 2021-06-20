import  Button  from '@material-ui/core/Button';
import React, { Component } from 'react';
import { isNamedTupleMember } from 'typescript';

//Types
import { CartItemType } from '../../App';

//Styles
import { Wrapper } from './Item.style';


type Props = {
item: CartItemType;
handleAddToCart: (clickedItem:CartItemType) => void;
}


 //React.FC is the object type for a react functional component
const Item: React.FC<Props> = ({item, handleAddToCart}) => (
    <Wrapper>
        <img src={item.image} alt={item.title}/>
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>£{item.price}</h3>
        </div>
        <Button onClick={() =>{handleAddToCart(item)}}>
            Add to cart
        </Button>
    </Wrapper>
);

 export default Item