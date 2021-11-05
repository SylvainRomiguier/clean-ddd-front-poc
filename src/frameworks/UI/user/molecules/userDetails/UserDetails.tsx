import { CartPresenterDto } from "../../../../../adapters/CartDto";
import { UserPresenterDto } from "../../../../../adapters/UserDto";
import { Button } from "../../../components/atoms/button/Button";
import { CartListOfCards } from "../../organisms/cartListOfCards/CartListOfCards";
import "./UserDetails.css";

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
    <div className="user-details-container">
        <table className="user-details">
            <tbody>
                <tr>
                    <td className="user-details-label">Id</td>
                    <td> {user.id}</td>
                </tr>
                <tr>
                    <td className="user-details-label">User name</td>
                    <td> {user.userName}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        {user.firstName} {user.lastName}
                    </td>
                </tr>
                <tr>
                    <td className="user-details-label">Carts count</td>
                    <td> {user.carts?.length || 0}</td>
                </tr>
                <tr>
                    <td className="user-details-label">Orders count</td>
                    <td>
                        {user.carts?.reduce(
                            (acc, cart) => acc + (cart?.orders?.length || 0),
                            0
                        )}
                    </td>
                </tr>
            </tbody>
        </table>
        <Button onClick={() => onAddCart(user.id)}>Add cart</Button>
        <div style={{ marginTop: "10px" }}></div>
        <CartListOfCards
            cartsList={user.carts || []}
            selectCart={(cart) => onSelectCartId(cart.id)}
            selectedCart={selectedCart}
        />
    </div>
);
