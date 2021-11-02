import { UserControllerDto, UserPresenterDto } from "./UserDto";

interface ErrorResult {
    reason: string;
}

interface SuccessResult<T> {
    result: T;
}

export type UserResult = SuccessResult<UserPresenterDto> | ErrorResult;
export type UsersResult = SuccessResult<UserPresenterDto[]> | ErrorResult;

export type UserRepositoryResult = UserResult | UsersResult;

export const IsErrorUserResult = (
    response: UserRepositoryResult
): response is ErrorResult => {
    return (response as ErrorResult).reason !== undefined;
};

export interface IUserRepository {
    createUser: (user: UserControllerDto) => Promise<UserResult>;
    updateUser: (user: UserControllerDto) => Promise<UserResult>;
    deleteUser: (
        user: UserControllerDto
    ) => Promise<ErrorResult | SuccessResult<boolean>>;
    getUserById: (id: string) => Promise<UserResult>;
    getAllUsers: () => Promise<UsersResult>;
    removeAllUsers: () => Promise<void>;
}
