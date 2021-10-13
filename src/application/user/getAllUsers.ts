import {
    IUserRepository,
    IsErrorUserResult,
} from "../../adapters/IUserRepository";
import { userPresenterDtoToDomain } from "../../adapters/UserDto";
import { User } from "../../domain/user";

export const makeGetAllUsers = (repository: IUserRepository) => async () => {
    const response = await repository.getAllUsers();
    if (!IsErrorUserResult(response))
        return response.result.map((repositoryUser) =>
            userPresenterDtoToDomain(repositoryUser)
        );
    return [] as User[];
};
