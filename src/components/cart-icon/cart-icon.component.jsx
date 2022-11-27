import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import {
  ShoppingIcon,
  CartIconContainer,
  IconCount,
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  return (
    <CartIconContainer
      onClick={() => setIsCartOpen(!isCartOpen)}
    >
      <ShoppingIcon />
      <IconCount>{cartCount}</IconCount>
    </CartIconContainer>
  );
};

export default CartIcon;
