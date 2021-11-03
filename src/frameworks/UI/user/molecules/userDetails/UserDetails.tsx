import { CartPresenterDto } from "../../../../../adapters/CartDto";
import { UserPresenterDto } from "../../../../../adapters/UserDto";
import { Button } from "../../../components/atoms/button/Button";
import { CartListOfCards } from "../../organisms/cartListOfCards/CartListOfCards";

export interface UserDetailsProps {
    user: UserPresenterDto;
    onAddCart: () => void;
    selectedCart: CartPresenterDto | undefined;
    setSelectedCart: (cart: CartPresenterDto) => void;
}

export const UserDetails: React.FC<UserDetailsProps> = ({
    user,
    onAddCart,
    selectedCart,
    setSelectedCart,
}) => (
    <div>
        <div>Id : {user.id}</div>
        <div>User name : {user.userName}</div>
        <div>
            {user.firstName} {user.lastName}
        </div>
        <Button onClick={onAddCart}>Add cart</Button>
        <div style={{ marginTop: "10px" }}></div>
        <CartListOfCards
            cartsList={user.carts || []}
            selectCart={(cart) => setSelectedCart(cart)}
            selectedCart={selectedCart}
        />
    </div>
);
