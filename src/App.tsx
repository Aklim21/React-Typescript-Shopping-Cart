import {useState} from 'react';
import { useQuery } from 'react-query';

//Components
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge';
import Item from './components/Item/Item'
import Cart from './components/Cart/Cart';


//Styles
import {Wrapper, StyledButton} from './App.style';

//Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  quantity: number;
}


//Grab our data using fakestoreapi. 
//Double await since we await the creation of the json data, after the await of the fetch.
const url = 'https://fakestoreapi.com/products'
const getProductData = async (): Promise<CartItemType[]> => await (await fetch(url)).json();



const App = () => {

  //
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);


  //Load item data
  const {data, isLoading, error} = useQuery<CartItemType[]>(
    'products',
    getProductData
    );
    console.log(data);

  const getTotalItems = (items: CartItemType[]) => 
    items.reduce((ack: number, item) => ack + item.quantity, 0);

  if (isLoading) return <LinearProgress/>
  if (error) return <div>We have a problem chief...</div>


  //Cart functions
  const handleAddToCart = (clickedItem:CartItemType) => {
    setCartItems(prev =>{ 
      
      //If item already in the cart:
      const isItemInCart = prev.find(item => item.id === clickedItem.id) //Loop through items in previous state
      if (isItemInCart){
        return prev.map(item =>(
          item.id === clickedItem.id ? 
          {...item, quantity: item.quantity + 1} : item
        ))
      } 
      //If first time adding item:
      return [...prev, {...clickedItem, quantity: 1}] //return previous state, add new spreaded item

    })
  };

  const handleRemoveFromCart = (id: number) => {
    //setCartItems, we retrieve the previous cart items state.
    setCartItems(prev =>(
      //we call reduce on the previous state.
      prev.reduce((ack, item) => {
        if (item.id ===id){
          //If quantity = 1, we return only ack. This returns an empty array and thus deletes this item from state.
          if(item.quantity === 1) return ack;
          //else, we return the accumulator array, and update the value of our item quantity
          return [...ack, {...item, quantity: item.quantity -1}]
        }
        //else we just return the ack & item since its not the item we are concerned with.
        else {
          return [...ack, item];
        }
      },[] as CartItemType[])
    )
  )};




  //GUI 
  return (
    <Wrapper>
    <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
      <Cart 
        cartItems={cartItems} 
        addToCart={handleAddToCart} 
        removeFromCart={handleRemoveFromCart}
      />
    </Drawer>
    <StyledButton onClick={() => setCartOpen(true)}>
      <Badge badgeContent={getTotalItems(cartItems)} color='error' >
        <AddShoppingCartIcon/>
      </Badge>
    </StyledButton>

      <Grid container spacing={3}> 
        {data?.map((item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart}/>
          </Grid>
        )))}  
      </Grid>
    </Wrapper>
  );
}

export default App;
