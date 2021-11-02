import {
    IUserRepository,
    IsErrorUserResult,
} from "../../adapters/IUserRepository";

export const makeGetAllUsers = (repository: IUserRepository) => async () => {
    const response = await repository.getAllUsers();
    if (!IsErrorUserResult(response)) return response.result;
    throw new Error(response.reason);
};
