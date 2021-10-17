import { UserResult, IsErrorUserResult } from "../../adapters/IUserRepository";
import { UserPresenterDto } from "../../adapters/UserDto";
import { Cart, User } from "../../domain/user";
import { UserFormOutput } from "../../frameworks/UI/user/userForm/UserForm";
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
}

export interface UserService {
    handleUser: (
        event: UserEvent,
        listener: Listener<UserEvent>
    ) => (user: UserFormOutput) => Promise<UserPresenterDto>;
    getAllUsers: () => Promise<User[]>;
}

export type UserEvent = "CREATE_USER" | "UPDATE_USER" | "REMOVE_USER";
const userObserver = createObserver<UserEvent>();

export const makeUserService = (userUseCases: UserUseCases):UserService => ({
    handleUser:
        (event: UserEvent, listener: Listener<UserEvent>) =>
        async (user: UserFormOutput): Promise<UserPresenterDto> => {
            const unsubscribe = userObserver.subscribe(listener);
            let response;
            switch (event) {
                case "CREATE_USER":
                    response = await userUseCases.addUser(
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
                    response = await userUseCases.updateUser(
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
        },
    getAllUsers: userUseCases.getAllUsers,
});
