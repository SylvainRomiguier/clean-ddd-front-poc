import { makeAddUser } from "./application/user/addUser";
import { makeGetUserById } from "./application/user/getUserById";
import { makeInMemoryUserRepository } from "./frameworks/repositories/InMemoryUserRepository";
import { v4 as uniqueIdGenerator } from "uuid";
import { makeGetAllUsers } from "./application/user/getAllUsers";
import { makeInMemoryProductRepository } from "./frameworks/repositories/InMemoryProductRepository";
import { makeAddProduct } from "./application/product/addProduct";
import { makeGetAllProducts } from "./application/product/getAllProducts";
import { makeUpdateUser } from "./application/user/updateUser";

const inMemoryUserRepository = makeInMemoryUserRepository(uniqueIdGenerator);

export const addUser = makeAddUser(inMemoryUserRepository);
export const updateUser = makeUpdateUser(inMemoryUserRepository);
export const getUserById = makeGetUserById(inMemoryUserRepository);
export const getAllUsers = makeGetAllUsers(inMemoryUserRepository);

const inMemoryProductRepository =
    makeInMemoryProductRepository(uniqueIdGenerator);

export const addProduct = makeAddProduct(inMemoryProductRepository);
export const getAllProducts = makeGetAllProducts(inMemoryProductRepository);
