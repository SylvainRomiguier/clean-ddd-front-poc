import { useState } from "react";
import "./App.css";
import { IsErrorUserResult } from "./adapters/IUserRepository";
import {
    UserPresenterDto,
    userPresenterDtoFromDomain,
} from "./adapters/UserDto";
import { UserForm, UserFormOutput } from "./frameworks/UI/userForm/UserForm";
import { UsersList } from "./frameworks/UI/users/UsersList";
import {
    addProduct,
    addUser,
    updateUser,
    getAllProducts,
    getAllUsers,
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
import { ProductsList } from "./frameworks/UI/products/ProductsList";
import { createObserver, Listener } from "./observer/Observer";

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
            userObserver.publish("CREATE_USER");
            unsubscribe();
            return response.result;
        }
        unsubscribe();
        throw new Error(response.reason);
    };

const saveProduct =
    (listener: Listener<ProductEvent>) =>
    async (product: ProductFormOutput): Promise<ProductPresenterDto> => {
        const unsubscribe = productObserver.subscribe(listener);
        const response = await addProduct(product.name, product.qtyInStock);
        if (!IsErrorProductResult(response)) {
            productObserver.publish("CREATE_PRODUCT");
            unsubscribe();
            return response.result;
        }
        unsubscribe();
        throw new Error(response.reason);
    };

function App() {
    const [selectedUser, setSelectedUser] = useState<
        UserPresenterDto | undefined
    >(undefined);

    const [usersList, setUsersList] = useState<UserPresenterDto[]>([]);
    const [productsList, setProductsList] = useState<ProductPresenterDto[]>([]);

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
                            <button
                                onClick={() => setSelectedUser(undefined)}
                                style={{ width: "100%", marginTop: "10px" }}
                            >
                                Ajouter un utilisateur
                            </button>
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
                <div className="usersList">
                    <UsersList
                        usersList={usersList}
                        selectUser={setSelectedUser}
                        selectedUser={selectedUser}
                    />
                </div>
            </div>
            <div className="productContainer">
                <div style={{ width: "30%" }}>
                    <ProductForm onSubmit={saveProduct(updateProductsList)} />
                </div>
                <div className="usersList">
                    <ProductsList productsList={productsList} />
                </div>
            </div>
        </div>
    );
}

export default App;
