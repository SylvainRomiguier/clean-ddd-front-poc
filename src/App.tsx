import { useState } from "react";
import "./App.css";
import {
    UserPresenterDto,
    userPresenterDtoFromDomain,
} from "./adapters/UserDto";
import {
    UserForm,
    UserFormOutput,
} from "./frameworks/UI/user/userForm/UserForm";

import { ProductForm, ProductFormOutput } from "./frameworks/UI/product/productForm/ProductForm";
import {
    ProductPresenterDto,
    productPresenterDtoFromDomain,
} from "./adapters/ProductDto";
import { UserListOfCards } from "./frameworks/UI/user/userListOfCards/UserListOfCards";
import { ProductListOfCards } from "./frameworks/UI/product/productListOfCards/ProductListOfCards";
import { services } from "./services/ioc";
import { ProductEvent } from "./services/product/productService";
import { UserEvent } from "./services/user/userService";

function App() {
    const [usersList, setUsersList] = useState<UserPresenterDto[]>([]);
    const [selectedUser, setSelectedUser] = useState<
        UserPresenterDto | undefined
    >(undefined);
    const [productsList, setProductsList] = useState<ProductPresenterDto[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<
        ProductPresenterDto | undefined
    >(undefined);

    const updateUsersList = async (event: UserEvent) => {
        const usersListRead = await services.userService.getAllUsers();
        setUsersList(
            usersListRead.map((user) => userPresenterDtoFromDomain(user))
        );
    };

    const updateProductsList = async (event: ProductEvent) => {
        const productsListRead = await services.productService.getAllProducts();
        setProductsList(
            productsListRead.map((product) =>
                productPresenterDtoFromDomain(product)
            )
        );
    };

    const onUserUpdate = async (user: UserFormOutput) => {
        const _user =
            await services.userService.handleUser(
                "UPDATE_USER",
                updateUsersList
            )(user);
        if (_user.id) setSelectedUser(undefined);
        return _user;
    }

    const onProductUpdate = async (product: ProductFormOutput) => {
        const _product =
            await services.productService.handleProduct(
                "UPDATE_PRODUCT",
                updateProductsList
            )(product);
        if (_product.id) setSelectedProduct(undefined);
        return _product;
    }

    return (
        <div className="appContainer">
            <div className="userContainer">
                <div style={{ width: "30%" }}>
                    {selectedUser ? (
                        <>
                            <UserForm
                                id={selectedUser.id}
                                userName={selectedUser.userName}
                                firstName={selectedUser.firstName}
                                lastName={selectedUser.lastName}
                                onSubmit={onUserUpdate}
                            />
                        </>
                    ) : (
                        <UserForm
                            onSubmit={services.userService.handleUser(
                                "CREATE_USER",
                                updateUsersList
                            )}
                        />
                    )}
                </div>
                <div className="containerList">
                    <UserListOfCards
                        selectUser={setSelectedUser}
                        selectedUser={selectedUser}
                        usersList={usersList}
                    />
                </div>
            </div>
            <div className="productContainer">
                <div style={{ width: "30%" }}>
                    {selectedProduct ? (
                        <>
                            <ProductForm
                                id={selectedProduct.id}
                                name={selectedProduct.name}
                                qtyInStock={selectedProduct.qtyInStock}
                                onSubmit={onProductUpdate}
                            />
                        </>
                    ) : (
                        <ProductForm
                            onSubmit={services.productService.handleProduct(
                                "CREATE_PRODUCT",
                                updateProductsList
                            )}
                        />
                    )}
                </div>
                <div className="containerList">
                    <ProductListOfCards
                        selectProduct={setSelectedProduct}
                        selectedProduct={selectedProduct}
                        productsList={productsList}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
