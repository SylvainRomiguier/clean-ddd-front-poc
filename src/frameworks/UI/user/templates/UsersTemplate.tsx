import { CartPresenterDto } from "../../../../adapters/CartDto";
import { OrderControllerDto } from "../../../../adapters/OrderDto";
import { ProductPresenterDto } from "../../../../adapters/ProductDto";
import { UserPresenterDto } from "../../../../adapters/UserDto";
import { UserDetails } from "../molecules/userDetails/UserDetails";
import { CartDetails } from "../organisms/cartDetails/CartDetails";
import { UserFormOutput, UserForm } from "../organisms/userForm/UserForm";
import { UserListOfCards } from "../organisms/userListOfCards/UserListOfCards";

interface UsersTemplateProps {
    selectedUser?: UserPresenterDto;
    onAddUser: (user: UserFormOutput) => void;
    onUpdateUser: (user: UserFormOutput) => void;
    onSelectUserId: (userId?: string) => void;
    onSelectCartId: (cartId?: string) => void;
    productsList: ProductPresenterDto[];
    usersList: UserPresenterDto[];
    selectedCart?: CartPresenterDto;
    selectedProductToOrder?: ProductPresenterDto;
    onSelectProductToOrderId: (productId?: string) => void;
    onAddCart: (userId: string) => void;
    onAddOrder: (order: OrderControllerDto) => void;
}

export const UsersTemplate: React.FC<UsersTemplateProps> = ({
    productsList,
    usersList,
    onAddUser,
    onUpdateUser,
    onSelectUserId,
    onSelectCartId,
    onSelectProductToOrderId,
    onAddOrder,
    onAddCart,
    selectedCart,
    selectedProductToOrder,
    selectedUser,
}) => {
    return (
        <div className="userContainer">
            <div style={{ width: "30%" }}>
                {selectedCart ? (
                    <CartDetails
                        cart={selectedCart}
                        productsList={productsList}
                        onSelectProductToOrderId={onSelectProductToOrderId}
                        selectedProductToOrder={selectedProductToOrder}
                        onAddOrder={onAddOrder}
                    />
                ) : (
                    <UserForm
                        id={selectedUser?.id}
                        userName={selectedUser?.userName}
                        firstName={selectedUser?.firstName}
                        lastName={selectedUser?.lastName}
                        onSubmit={selectedUser?.id ? onUpdateUser : onAddUser}
                    />
                )}
            </div>
            <div className="containerList">
                {selectedUser! ? (
                    <UserDetails
                        user={selectedUser}
                        onAddCart={onAddCart}
                        selectedCart={selectedCart}
                        onSelectCartId={onSelectCartId}
                    />
                ) : (
                    <UserListOfCards
                        onSelectUserId={onSelectUserId}
                        selectedUser={selectedUser}
                        usersList={usersList}
                    />
                )}
            </div>
        </div>
    );
};
