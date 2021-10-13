import {
    IUserRepository,
    IsErrorUserResult,
} from "../../adapters/IUserRepository";
import { userPresenterDtoToDomain } from "../../adapters/UserDto";
import { UniqueId } from "../../domain/types";

export const makeGetUserById =
    (repository: IUserRepository) => async (id: UniqueId) => {
        const response = await repository.getUserById(id);
        if (!IsErrorUserResult(response))
            return userPresenterDtoToDomain(response.result);
        throw Error(response.reason);
    };
