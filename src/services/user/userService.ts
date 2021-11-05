import { UserControllerDto, UserPresenterDto } from "../../adapters/UserDto";
import { Listener, createObserver } from "../observer/Observer";
import { productObserver } from "../product/productService";

export interface UserUseCases {
    addUser: (user: UserControllerDto) => Promise<UserPresenterDto>;
    updateUser: (user: UserControllerDto) => Promise<UserPresenterDto>;
    getUserById: (id: string) => Promise<UserPresenterDto>;
    getAllUsers: () => Promise<UserPresenterDto[]>;
    removeAllUsers: () => Promise<void>;
    addCart: (userId: string) => Promise<UserPresenterDto>;
    addOrderToCart: (
        userId: string,
        cartId: string,
        productId: string,
        quantity: number
    ) => Promise<UserPresenterDto>;
}

export interface UserService extends UserUseCases {
    subscribe: (listener: Listener<UserEvent>) => () => void;
}

export type UserEvent = "CREATE_USER" | "UPDATE_USER" | "REMOVE_USER";
const userObserver = createObserver<UserEvent>();

export const makeUserService = (userUseCases: UserUseCases): UserService => ({
    addUser: async (user: UserControllerDto) => {
        const response = await userUseCases.addUser(user);
        userObserver.publish("CREATE_USER");
        return response;
    },
    updateUser: async (user: UserControllerDto) => {
        const response = await userUseCases.updateUser(user);
        userObserver.publish("UPDATE_USER");
        return response;
    },
    getUserById: userUseCases.getUserById,
    getAllUsers: userUseCases.getAllUsers,
    removeAllUsers: userUseCases.removeAllUsers,
    addCart: async (userId: string) => {
        const response = await userUseCases.addCart(userId);
        userObserver.publish("UPDATE_USER");
        return response;
    },
    addOrderToCart: async (
        userId: string,
        cartId: string,
        productId: string,
        quantity: number
    ) => {
        const response = await userUseCases.addOrderToCart(
            userId,
            cartId,
            productId,
            quantity
        );
        userObserver.publish("UPDATE_USER");
        productObserver.publish("UPDATE_PRODUCT");
        return response;
    },
    subscribe: (listener: Listener<UserEvent>) =>
        userObserver.subscribe(listener),
});
