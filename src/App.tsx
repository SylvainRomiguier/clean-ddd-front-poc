import { useState } from "react";
import "./App.css";
import { IsErrorUserResult } from "./adapters/IUserRepository";
import {
    UserPresenterDto,
    userPresenterDtoFromDomain,
} from "./adapters/UserDto";
import { UserForm, UserFormOutput } from "./frameworks/UI/userForm/UserForm";
import { UsersList } from "./frameworks/UI/users/UsersList";
import { addProduct, addUser, getAllProducts, getAllUsers } from "./ioc";
import {
    ProductForm,
    ProductFormOutput,
} from "./frameworks/UI/productForm/ProductForm";
import {
    ProductPresenterDto,
    productPresenterDtoFromDomain,
} from "./adapters/ProductDto";
import { IsErrorProductResult } from "./adapters/IProductRepository";
import { ProductsList } from "./frameworks/UI/products/ProductsList";

const persistUser = async (user: UserFormOutput): Promise<UserPresenterDto> => {
    const response = await addUser(
        user.userName,
        user.password,
        user.firstName,
        user.lastName
    );
    if (!IsErrorUserResult(response)) return response.result;
    throw new Error(response.reason);
};

const persistProduct = async (
    product: ProductFormOutput
): Promise<ProductPresenterDto> => {
    const response = await addProduct(product.name, product.qtyInStock);
    if (!IsErrorProductResult(response)) return response.result;
    throw new Error(response.reason);
};

function App() {
    const [usersList, setUsersList] = useState<UserPresenterDto[]>([]);
    const [productsList, setProductsList] = useState<ProductPresenterDto[]>([]);

    const getUsersList = async () => {
        const usersListRead = await getAllUsers();
        setUsersList(
            usersListRead.map((user) => userPresenterDtoFromDomain(user))
        );
    };

    const getProductsList = async () => {
        const productsListRead = await getAllProducts();
        setProductsList(
            productsListRead.map((product) =>
                productPresenterDtoFromDomain(product)
            )
        );
    };

    const saveUser = async (
        user: UserFormOutput
    ): Promise<UserPresenterDto> => {
        let response;
        try {
            response = await persistUser(user);
            await getUsersList();
            return response;
        } catch (e: any) {
            console.log(e);
            throw new Error(e.message || "");
        }
    };

    const saveProduct = async (
        product: ProductFormOutput
    ): Promise<ProductPresenterDto> => {
        let response;
        try {
            response = await persistProduct(product);
            await getProductsList();
            return response;
        } catch (e: any) {
            console.log(e);
            throw new Error(e.message || "");
        }
    };

    return (
        <div className="appContainer">
            <div className="userContainer">
                <div style={{ width: "30%" }}>
                    <UserForm onSubmit={saveUser} />
                </div>
                <div className="usersList">
                    <UsersList usersList={usersList} />
                </div>
            </div>
            <div className="productContainer">
                <div style={{ width: "30%" }}>
                    <ProductForm onSubmit={saveProduct} />
                </div>
                <div className="usersList">
                    <ProductsList productsList={productsList} />
                </div>
            </div>
        </div>
    );
}

export default App;
