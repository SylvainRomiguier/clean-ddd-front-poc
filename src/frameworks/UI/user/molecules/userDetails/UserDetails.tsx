import { CartPresenterDto } from "../../../../../adapters/CartDto";
import { UserPresenterDto } from "../../../../../adapters/UserDto";
import { Button } from "../../../components/atoms/button/Button";
import { CartListOfCards } from "../../organisms/cartListOfCards/CartListOfCards";

export interface UserDetailsProps {
    user: UserPresenterDto;
    onAddCart: (userId: string) => void;
    selectedCart: CartPresenterDto | undefined;
    onSelectCartId: (cartId?: string) => void;
}

export const UserDetails: React.FC<UserDetailsProps> = ({
    user,
    onAddCart,
    selectedCart,
    onSelectCartId,
}) => (
    <div>
        <div>Id : {user.id}</div>
        <div>User name : {user.userName}</div>
        <div>
            {user.firstName} {user.lastName}
        </div>
        <div>
            Carts count : {user.carts?.length || 0}
        </div>
        <div>Orders count : {user.carts?.reduce((acc, cart) => acc+(cart?.orders?.length || 0), 0)}</div>
        <Button onClick={() => onAddCart(user.id)}>Add cart</Button>
        <div style={{ marginTop: "10px" }}></div>
        <CartListOfCards
            cartsList={user.carts || []}
            selectCart={(cart) => onSelectCartId(cart.id)}
            selectedCart={selectedCart}
        />
    </div>
);
