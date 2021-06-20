import CartItem from "../CartItem/CartItem";

//Styles
import { Wrapper } from "../CartItem/CartItem.Style";

//Types
import { CartItemType } from "../../App";

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem:CartItemType) => void;
    removeFromCart: (id:number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
    const calculateTotal = (items: CartItemType[]) =>
    //we set the starting accumulator value to 0.
    //We the run reduce on the items array, each item in the array has their quant*price added to the ack value, giving the total
      items.reduce((ack: number, item) => ack + item.quantity * item.price, 0);
  
    return (
      <Wrapper>
        <h2>Your Shopping Cart</h2>
        {cartItems.length === 0 ? <p>No items in cart.</p> : null}
        {cartItems.map(item => (
          <CartItem
            key={item.id}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
        <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      </Wrapper>
    );
  };



export default Cart;