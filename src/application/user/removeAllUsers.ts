import {
    IUserRepository,
} from "../../adapters/IUserRepository";

export const makeRemoveAllUsers = (repository: IUserRepository) => async () => await repository.removeAllUsers();