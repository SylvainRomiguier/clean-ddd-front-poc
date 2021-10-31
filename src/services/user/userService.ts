import { cartControllerDtoToDomain } from "../../adapters/CartDto";
import { UserResult, IsErrorUserResult } from "../../adapters/IUserRepository";
import { UserControllerDto, UserPresenterDto } from "../../adapters/UserDto";
import { Cart, User } from "../../domain/user";
import { Listener, createObserver } from "../observer/Observer";

export interface UserUseCases {
    addUser: (
        userName: string,
        password: string,
        firstName?: string | undefined,
        lastName?: string | undefined
    ) => Promise<UserResult>;
    updateUser: (
        id: string,
        userName: string,
        password?: string | undefined,
        firstName?: string | undefined,
        lastName?: string | undefined,
        carts?: Cart[] | undefined
    ) => Promise<UserResult>;
    getAllUsers: () => Promise<User[]>;
    addCart: (user:User) => Promise<UserResult>;
}

export interface UserService {
    handleUser: (
        event: UserEvent,
        listener: Listener<UserEvent>
    ) => (user: UserControllerDto) => Promise<UserPresenterDto>;
    getAllUsers: () => Promise<User[]>;
    addCart:(listener: Listener<UserEvent>) => (user:User) => Promise<UserPresenterDto>;
}

export type UserEvent = "CREATE_USER" | "UPDATE_USER" | "REMOVE_USER";
const userObserver = createObserver<UserEvent>();

export const makeUserService = (userUseCases: UserUseCases):UserService => ({
    handleUser:
        (event: UserEvent, listener: Listener<UserEvent>) =>
        async (user: UserControllerDto): Promise<UserPresenterDto> => {
            const unsubscribe = userObserver.subscribe(listener);
            let response;
            switch (event) {
                case "CREATE_USER":
                    response = await userUseCases.addUser(
                        user.userName,
                        user.password || "",
                        user.firstName,
                        user.lastName
                    );
                    break;
                case "UPDATE_USER":
                    if (!user.id)
                        throw new Error(
                            `Can not update a user without id : ${user.userName}`
                        );
                    response = await userUseCases.updateUser(
                        user.id,
                        user.userName,
                        user.password,
                        user.firstName,
                        user.lastName,
                        user.carts?.map(cart => cartControllerDtoToDomain(cart))
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
        },
    getAllUsers: userUseCases.getAllUsers,
    addCart: (listener: Listener<UserEvent>) => async (user: User) => {
        const event = "UPDATE_USER";
        const unsubscribe = userObserver.subscribe(listener);
        const response  = await userUseCases.addCart(user);
        if (!IsErrorUserResult(response)) {
            userObserver.publish(event);
            unsubscribe();
            return response.result;
        }
        unsubscribe();
        throw new Error(response.reason);
    }
});
