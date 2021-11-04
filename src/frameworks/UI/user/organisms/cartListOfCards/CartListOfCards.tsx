import { CartPresenterDto } from "../../../../../adapters/CartDto";
import { ListOfCards } from "../../../components/atoms/listOfCards/ListOfCards";
import { CartCard } from "../../molecules/cartCard/CartCard";

export interface CartListOfCardsProps {
    cartsList: CartPresenterDto[];
    selectCart: (cart: CartPresenterDto) => void;
    selectedCart: CartPresenterDto | undefined;
}

export const CartListOfCards: React.FC<CartListOfCardsProps> = ({
    cartsList,
    selectCart,
    selectedCart,
}) => (
    <ListOfCards>
        {cartsList.sort((a,b) => (a.creationDate?.getTime() || 0) - (b.creationDate?.getTime() || 0)).map((cart) => (
            <CartCard
                key={cart.id}
                onClick={() => selectCart(cart)}
                selected={
                    selectedCart! && selectedCart.id === cart.id
                }
                cart={cart}
            />
        ))}
    </ListOfCards>
);
