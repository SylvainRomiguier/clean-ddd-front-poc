import { UserControllerDto, UserPresenterDto } from "../../adapters/UserDto";
import { Listener, createObserver } from "../observer/Observer";

export interface UserUseCases {
    addUser: (user: UserControllerDto) => Promise<UserPresenterDto>;
    updateUser: (user: UserControllerDto) => Promise<UserPresenterDto>;
    getUserById: (id: string) => Promise<UserPresenterDto>;
    getAllUsers: () => Promise<UserPresenterDto[]>;
    removeAllUsers: () => Promise<void>;
    addCart: (user: UserControllerDto) => Promise<UserPresenterDto>;
}

export interface UserService extends UserUseCases {
    subscribe: (listener: Listener<UserEvent>) => () => void;
}

export type UserEvent = "CREATE_USER" | "UPDATE_USER" | "REMOVE_USER";
const userObserver = createObserver<UserEvent>();

export const makeUserService = (userUseCases: UserUseCases): UserService => ({
    addUser: (user: UserControllerDto) => {
        const response = userUseCases.addUser(user);
        userObserver.publish("CREATE_USER");
        return response;
    },
    updateUser: (user: UserControllerDto) => {
        const response = userUseCases.updateUser(user);
        userObserver.publish("UPDATE_USER");
        return response;
    },
    getUserById: userUseCases.getUserById,
    getAllUsers: userUseCases.getAllUsers,
    removeAllUsers: userUseCases.removeAllUsers,
    addCart: (user: UserControllerDto) => {
        const response = userUseCases.addCart(user);
        userObserver.publish("UPDATE_USER");
        return response;
    },
    subscribe: (listener: Listener<UserEvent>) =>
        userObserver.subscribe(listener),
});
