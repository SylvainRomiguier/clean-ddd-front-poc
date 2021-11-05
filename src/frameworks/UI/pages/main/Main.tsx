import "./Main.css";

import { UsersTemplate } from "../../user/templates/UsersTemplate";
import { ProductsTemplate } from "../../product/templates/ProductsTemplate";
import { useCallback, useEffect, useState } from "react";
import {
    ProductControllerDto,
    ProductPresenterDto,
} from "../../../../adapters/ProductDto";
import {
    UserControllerDto,
    UserPresenterDto,
} from "../../../../adapters/UserDto";
import { services } from "../../../../services/ioc";
import { ProductFormOutput } from "../../product/organisms/productForm/ProductForm";
import { OrderControllerDto } from "../../../../adapters/OrderDto";
import { UserFormOutput } from "../../user/organisms/userForm/UserForm";
import { Modal } from "../../components/molecules/modal/Modal";

const initialErrors = {
    onAddUser: "",
    onUpdateUser: "",
    onAddProduct: "",
    onUpdateProduct: "",
    onAddCart: "",
    onAddOrder: "",
};

function Main() {
    const [errors, setErrors] = useState(initialErrors);
    const [productsList, setProductsList] = useState<ProductPresenterDto[]>([]);
    const [usersList, setUsersList] = useState<UserPresenterDto[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | undefined>(
        undefined
    );
    const [selectedCartId, setSelectedCartId] = useState<string | undefined>(
        undefined
    );
    const [selectedProductToOrderId, setSelectedProductToOrderId] = useState<
        string | undefined
    >(undefined);
    const [selectedProductId, setSelectedProductId] = useState<
        string | undefined
    >(undefined);

    const updateProductsList = useCallback(async () => {
        setProductsList(await services.productService.getAllProducts());
    }, []);

    const updateUsersList = useCallback(async () => {
        setUsersList(await services.userService.getAllUsers());
    }, []);

    // example data
    useEffect(() => {
        const unsubscribeUsersChange =
            services.userService.subscribe(updateUsersList);
        const unsubscribeProductsChange =
            services.productService.subscribe(updateProductsList);
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
        services.productService.removeAllProducts();
        services.productService.addProduct(
            new ProductControllerDto("Apple", 10)
        );
        services.productService.addProduct(
            new ProductControllerDto("Pear", 15)
        );
        services.productService.addProduct(
            new ProductControllerDto("Cherry", 10)
        );
        return function () {
            unsubscribeUsersChange();
            unsubscribeProductsChange();
        };
    }, [updateUsersList, updateProductsList]);
    // -----------------

    // Product mutation handlers -----------------------------------------
    const onProductAdd = async (product: ProductFormOutput) => {
        await services.productService.addProduct(
            new ProductControllerDto(
                product.name,
                product.qtyInStock,
                undefined
            )
        );
    };

    const onProductUpdate = async (product: ProductFormOutput) => {
        const _product = await services.productService.updateProduct(
            new ProductControllerDto(
                product.name,
                product.qtyInStock,
                product.id
            )
        );
        if (_product.id) setSelectedProductId(undefined);
    };
    // -------------------------------------------------------------------

    // User, Cart, Order mutation handlers -------------------------------
    const onAddUser = async (user: UserFormOutput) => {
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

    const onUpdateUser = async (user: UserFormOutput) => {
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
        if (_user.id) setSelectedUserId(undefined);
    };

    const onAddCart = async (userId: string) => {
        await services.userService.addCart(userId);
    };

    const onAddOrder = async (order: OrderControllerDto) => {
        if (!selectedUser!) return;
        if (!selectedCart?.id!) return;
        if (!order?.product?.id!) return;
        try {
            await services.userService.addOrderToCart(
                selectedUser.id,
                selectedCart.id,
                order.product.id,
                order.qty
            );
        } catch (e) {
            if (e instanceof Error) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    onAddOrder: `${order.product.name} stock : ${(e as Error).message}`,
                }));
            }
            console.log(e);
        }
    };
    // -------------------------------------------------------------------

    const onModalClose = () => setErrors(initialErrors);

    const selectedUser = getUserFromUsersList(usersList, selectedUserId);
    const selectedCart = getCartFromUser(selectedUser, selectedCartId);
    const selectedProduct = getProductFromProductsList(
        productsList,
        selectedProductId
    );
    const selectedProductToOrder = getProductFromProductsList(
        productsList,
        selectedProductToOrderId
    );

    return (
        <div className="appContainer">
            <UsersTemplate
                productsList={productsList}
                usersList={usersList}
                onAddUser={onAddUser}
                onUpdateUser={onUpdateUser}
                onAddCart={onAddCart}
                onAddOrder={onAddOrder}
                onSelectCartId={setSelectedCartId}
                onSelectProductToOrderId={setSelectedProductToOrderId}
                onSelectUserId={setSelectedUserId}
                selectedUser={selectedUser}
                selectedCart={selectedCart}
                selectedProductToOrder={selectedProductToOrder}
            />
            <ProductsTemplate
                onProductAdd={onProductAdd}
                onProductUpdate={onProductUpdate}
                onSelectProductId={setSelectedProductId}
                selectedProduct={selectedProduct}
                productsList={productsList}
            />
            {errors.onAddOrder !== "" && <Modal open={true} onClose={onModalClose}>{errors.onAddOrder}</Modal>}
        </div>
    );
}

export default Main;

const getUserFromUsersList = (users: UserPresenterDto[], userId?: string) =>
    users.find((user) => user.id === userId);
const getCartFromUser = (user?: UserPresenterDto, cartId?: string) => {
    if (!user! || !cartId!) return;
    return user.carts?.find((cart) => cart.id === cartId);
};
const getProductFromProductsList = (
    products: ProductPresenterDto[],
    productId?: string
) => products.find((product) => product.id === productId);
