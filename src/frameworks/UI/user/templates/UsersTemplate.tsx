import { useEffect, useState } from "react";
import { CartPresenterDto } from "../../../../adapters/CartDto";
import { ProductPresenterDto } from "../../../../adapters/ProductDto";
import {
    UserControllerDto,
    UserPresenterDto,
} from "../../../../adapters/UserDto";
import { services } from "../../../../services/ioc";
import { UserDetails } from "../molecules/userDetails/UserDetails";
import { CartDetails } from "../organisms/cartDetails/CartDetails";
import { UserFormOutput, UserForm } from "../organisms/userForm/UserForm";
import { UserListOfCards } from "../organisms/userListOfCards/UserListOfCards";

export const UsersTemplate: React.FC = () => {
    const [productsList, setProductsList] = useState<ProductPresenterDto[]>([]);
    const [usersList, setUsersList] = useState<UserPresenterDto[]>([]);
    const [selectedUser, setSelectedUser] = useState<
        UserPresenterDto | undefined
    >(undefined);
    const [selectedCart, setSelectedCart] = useState<
        CartPresenterDto | undefined
    >(undefined);
    const [selectedProductToOrder, setSelectedProductToOrder] = useState<
    ProductPresenterDto | undefined
>(undefined);

    const updateUsersList = async () =>
        setUsersList(await services.userService.getAllUsers());

    const updateProductsList = async () =>
        setProductsList(await services.productService.getAllProducts());

    const onUserAdd = async (user: UserFormOutput) => {
        await services.userService.addUser(
            new UserControllerDto(
                undefined,
                user.userName,
                user.password,
                user.firstName,
                user.lastName
            )
        );
    };

    const onUserUpdate = async (user: UserFormOutput) => {
        if (!selectedUser!) return;
        const userController = new UserControllerDto(
            user.id,
            user.userName,
            undefined,
            user.firstName,
            user.lastName,
            selectedUser.carts?.map((cart) => cart.toCartControllerDto())
        );
        const _user = await services.userService.updateUser(userController);
        if (_user.id) setSelectedUser(undefined);
    };

    const onAddCart = async () => {
        if (!selectedUser!) return;
        const userWithNewCart = await services.userService.addCart(
            selectedUser?.id
        );
        setSelectedUser(userWithNewCart);
    };

    const onSelectProductToOrder = async (product: ProductPresenterDto) => {
        setSelectedProductToOrder(product);
    };

    // example data
    useEffect(() => {
        const unsubscribe = services.userService.subscribe(updateUsersList);
        services.userService.removeAllUsers();
        services.userService.addUser(
            new UserControllerDto(
                undefined,
                "SylvainUserName",
                "aA123456",
                "Sylvain",
                "Romiguier"
            )
        );
        return function () {
            unsubscribe();
        };
    }, []);
    // -----------------

    useEffect(() => {
        if (selectedCart!) updateProductsList();
    }, [selectedCart]);

    return (
        <div className="userContainer">
            <div style={{ width: "30%" }}>
                {selectedCart ? (
                    <CartDetails
                        cart={selectedCart}
                        productsList={productsList}
                        onSelectProductToOrder={onSelectProductToOrder}
                        selectedProductToOrder={selectedProductToOrder}
                    />
                ) : (
                    <UserForm
                        id={selectedUser?.id}
                        userName={selectedUser?.userName}
                        firstName={selectedUser?.firstName}
                        lastName={selectedUser?.lastName}
                        onSubmit={selectedUser ? onUserUpdate : onUserAdd}
                    />
                )}
            </div>
            <div className="containerList">
                {selectedUser ? (
                    <UserDetails
                        user={selectedUser}
                        onAddCart={onAddCart}
                        selectedCart={selectedCart}
                        setSelectedCart={setSelectedCart}
                    />
                ) : (
                    <UserListOfCards
                        selectUser={setSelectedUser}
                        selectedUser={selectedUser}
                        usersList={usersList}
                    />
                )}
            </div>
        </div>
    );
};
