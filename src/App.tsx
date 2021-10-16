import { useState } from "react";
import "./App.css";
import { IsErrorUserResult } from "./adapters/IUserRepository";
import {
    UserPresenterDto,
    userPresenterDtoFromDomain,
} from "./adapters/UserDto";
import { UserForm, UserFormOutput } from "./frameworks/UI/userForm/UserForm";
import {
    addProduct,
    addUser,
    updateUser,
    getAllProducts,
    getAllUsers,
    updateProduct,
} from "./ioc";
import {
    ProductForm,
    ProductFormOutput,
} from "./frameworks/UI/productForm/ProductForm";
import {
    ProductPresenterDto,
    productPresenterDtoFromDomain,
} from "./adapters/ProductDto";
import { IsErrorProductResult } from "./adapters/IProductRepository";
import { createObserver, Listener } from "./observer/Observer";
import { ListOfCards } from "./frameworks/UI/listOfCards/ListOfCards";
import { Card } from "./frameworks/UI/card/Card";
import { Button } from "./frameworks/UI/button/Button";

type UserEvent = "CREATE_USER" | "UPDATE_USER" | "REMOVE_USER";
type ProductEvent = "CREATE_PRODUCT" | "UPDATE_PRODUCT" | "REMOVE_PRODUCT";

const userObserver = createObserver<UserEvent>();
const productObserver = createObserver<ProductEvent>();

const handleUser =
    (event: UserEvent, listener: Listener<UserEvent>) =>
    async (user: UserFormOutput): Promise<UserPresenterDto> => {
        const unsubscribe = userObserver.subscribe(listener);
        let response;
        switch (event) {
            case "CREATE_USER":
                response = await addUser(
                    user.userName,
                    user.password,
                    user.firstName,
                    user.lastName
                );
                break;
            case "UPDATE_USER":
                if (!user.id)
                    throw new Error(
                        `Can not update a user without id : ${user.userName}`
                    );
                response = await updateUser(
                    user.id,
                    user.userName,
                    user.password,
                    user.firstName,
                    user.lastName
                );
                break;
            default:
                throw new Error(`Unknown user event: ${event}`);
        }
        if (!IsErrorUserResult(response)) {
            userObserver.publish(event);
            unsubscribe();
            return response.result;
        }
        unsubscribe();
        throw new Error(response.reason);
    };

const handleProduct =
    (event: ProductEvent, listener: Listener<ProductEvent>) =>
    async (product: ProductFormOutput): Promise<ProductPresenterDto> => {
        const unsubscribe = productObserver.subscribe(listener);
        let response;
        switch (event) {
            case "CREATE_PRODUCT":
                response = await addProduct(product.name, product.qtyInStock);
                break;
            case "UPDATE_PRODUCT":
                if (!product.id)
                throw new Error(
                    `Can not update a product without id : ${product.name}`
                );
                response = await updateProduct(
                    product.id,
                    product.name,
                    product.qtyInStock
                );
                break;
            default:
                throw new Error(`Unknown product event: ${event}`);
        }
        if (!IsErrorProductResult(response)) {
            productObserver.publish(event);
            unsubscribe();
            return response.result;
        }
        unsubscribe();
        throw new Error(response.reason);
    };

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
        const usersListRead = await getAllUsers();
        setUsersList(
            usersListRead.map((user) => userPresenterDtoFromDomain(user))
        );
    };

    const updateProductsList = async (event: ProductEvent) => {
        const productsListRead = await getAllProducts();
        setProductsList(
            productsListRead.map((product) =>
                productPresenterDtoFromDomain(product)
            )
        );
    };

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
                                onSubmit={handleUser(
                                    "UPDATE_USER",
                                    updateUsersList
                                )}
                            />
                            <Button onClick={() => setSelectedUser(undefined)}>
                                Ajouter un utilisateur
                            </Button>
                        </>
                    ) : (
                        <UserForm
                            onSubmit={handleUser(
                                "CREATE_USER",
                                updateUsersList
                            )}
                        />
                    )}
                </div>
                <div className="containerList">
                    <ListOfCards>
                        {usersList.map((user) => (
                            <Card
                                onClick={() => setSelectedUser(user)}
                                selected={
                                    selectedUser
                                        ? selectedUser.id === user.id
                                        : false
                                }
                            >
                                <div>{user.id}</div>
                                <div>{user.userName}</div>
                                <div>{user.firstName && user.firstName}</div>
                                <div>{user.lastName && user.lastName}</div>
                            </Card>
                        ))}
                    </ListOfCards>
                </div>
            </div>
            <div className="productContainer">
                <div style={{ width: "30%" }}>
                    {selectedProduct ? (
                        <>
                            <ProductForm
                                onSubmit={handleProduct(
                                    "UPDATE_PRODUCT",
                                    updateProductsList
                                )}
                            />
                            <Button
                                onClick={() => setSelectedProduct(undefined)}
                            >
                                Ajouter un produit
                            </Button>
                        </>
                    ) : (
                        <ProductForm
                            onSubmit={handleProduct(
                                "CREATE_PRODUCT",
                                updateProductsList
                            )}
                        />
                    )}
                </div>
                <div className="containerList">
                    <ListOfCards>
                        {productsList.map((product) => (
                            <Card
                                onClick={() => setSelectedProduct(product)}
                                selected={
                                    selectedProduct
                                        ? selectedProduct.id === product.id
                                        : false
                                }
                            >
                                <div>{product.id}</div>
                                <div>{product.name}</div>
                                <div>stock : {product.qtyInStock}</div>
                            </Card>
                        ))}
                    </ListOfCards>
                </div>
            </div>
        </div>
    );
}

export default App;
