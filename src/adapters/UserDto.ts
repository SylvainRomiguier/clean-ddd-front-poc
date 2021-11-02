import { User } from "../domain/user";
import { CartControllerDto, CartPresenterDto } from "./CartDto";

export class UserPresenterDto {
    id: string;
    userName: string;
    firstName?: string;
    lastName?: string;
    carts?: CartPresenterDto[];

    constructor(
        _id: string,
        _userName: string,
        _firstName?: string,
        _lastName?: string,
        _carts?: CartPresenterDto[]
    ) {
        this.id = _id;
        this.userName = _userName;
        this.firstName = _firstName;
        this.lastName = _lastName;
        this.carts = _carts;
    }

    toDomain = () =>
        new User(
            this.userName,
            this.id,
            undefined,
            this.firstName,
            this.lastName,
            this.carts?.map((cart) => cart.toDomain())
        );
}

export class UserControllerDto {
    id?: string;
    userName?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    carts?: CartControllerDto[];
    constructor(
        _id?: string,
        _userName?: string,
        _password?:string,
        _firstName?: string,
        _lastName?: string,
        _carts?: CartControllerDto[]
    ) {
        this.id = _id;
        this.userName = _userName;
        this.password = _password;
        this.firstName = _firstName;
        this.lastName = _lastName;
        this.carts = _carts;
    }

    toDomain = () =>
        new User(
            this.userName,
            this.id,
            this.password,
            this.firstName,
            this.lastName,
            this.carts?.map((cart) => cart.toDomain())
        );
}
