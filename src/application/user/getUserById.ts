import {
    IUserRepository,
    IsErrorUserResult,
} from "../../adapters/IUserRepository";

export const makeGetUserById =
    (repository: IUserRepository) => async (id: string) => {
        const response = await repository.getUserById(id);
        if (!IsErrorUserResult(response)) return response.result;
        throw Error(response.reason);
    };
