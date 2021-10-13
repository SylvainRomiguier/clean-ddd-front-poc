import {
    FirstName,
    LastName,
    Password,
    UniqueId,
    UserName,
} from "../domain/types";
import { makeUser, User } from "../domain/user";
import {
    CartControllerDto,
    cartControllerDtoFromDomain,
    CartPresenterDto,
    cartPresenterDtoFromDomain,
    cartPresenterDtoToDomain,
} from "./CartDto";

export interface UserPresenterDto {
    id: UniqueId;
    userName: UserName;
    firstName?: FirstName;
    lastName?: LastName;
    carts?: CartPresenterDto[];
}

export interface UserControllerDto {
    id?: UniqueId;
    userName: UserName;
    password?: Password;
    firstName?: FirstName;
    lastName?: LastName;
    carts?: CartControllerDto[];
}

export const makeUserPresenterDto = (
    id: UniqueId,
    userName: UserName,
    firstName?: FirstName,
    lastName?: LastName,
    carts?: CartPresenterDto[]
) =>
    Object.freeze({
        id,
        userName,
        firstName,
        lastName,
        carts,
    });

export const userControllerDtoFromDomain = (user: User): UserControllerDto => {
    return Object.freeze({
        id: user.id,
        userName: user.userName,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        carts: user.carts?.map((cart) => cartControllerDtoFromDomain(cart)),
    });
};

export const userPresenterDtoFromDomain = (user: User): UserPresenterDto => {
    if (!user.id) throw new Error("User without id");
    return Object.freeze({
        id: user.id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        carts: user.carts?.map((cart) => cartPresenterDtoFromDomain(cart)),
    });
};

export const userPresenterDtoToDomain = (user: UserPresenterDto): User =>
    makeUser(
        user.userName,
        user.id,
        undefined,
        user.firstName,
        user.lastName,
        user.carts?.map((cart) => cartPresenterDtoToDomain(cart))
    );
