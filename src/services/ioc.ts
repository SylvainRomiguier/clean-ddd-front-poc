import { makeAddUser } from "../application/user/addUser";
// import { makeGetUserById } from "../application/user/getUserById";
import { makeInMemoryUserRepository } from "../frameworks/repositories/InMemoryUserRepository";
import { v4 as uniqueIdGenerator } from "uuid";
import { makeGetAllUsers } from "../application/user/getAllUsers";
import { makeInMemoryProductRepository } from "../frameworks/repositories/InMemoryProductRepository";
import { makeAddProduct } from "../application/product/addProduct";
import { makeGetAllProducts } from "../application/product/getAllProducts";
import { makeUpdateUser } from "../application/user/updateUser";
import { makeUpdateProduct } from "../application/product/updateProduct";
import { makeProductService } from "./product/productService";
import { makeUserService } from "./user/userService";
import { makeServices } from "./services";
import { makeAddCart } from "../application/user/addCart";

const inMemoryUserRepository = makeInMemoryUserRepository(uniqueIdGenerator);

 const addUser = makeAddUser(inMemoryUserRepository);
 const updateUser = makeUpdateUser(inMemoryUserRepository);
 // const getUserById = makeGetUserById(inMemoryUserRepository);
 const getAllUsers = makeGetAllUsers(inMemoryUserRepository);
 const addCart = makeAddCart(uniqueIdGenerator, inMemoryUserRepository);

const userService = makeUserService({addUser, updateUser, getAllUsers, addCart});

const inMemoryProductRepository =
    makeInMemoryProductRepository(uniqueIdGenerator);

 const addProduct = makeAddProduct(inMemoryProductRepository);
 const updateProduct = makeUpdateProduct(inMemoryProductRepository);
 const getAllProducts = makeGetAllProducts(inMemoryProductRepository);

const productService = makeProductService({addProduct, updateProduct, getAllProducts});

export const services = makeServices({userService, productService});
