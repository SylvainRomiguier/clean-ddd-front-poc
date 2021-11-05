import { makeAddUser } from "../application/user/addUser";
import { makeGetUserById } from "../application/user/getUserById";
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
import { makeAddCart } from "../application/cart/addCart";
import { makeRemoveAllUsers } from "../application/user/removeAllUsers";
import { makeRemoveAllProducts } from "../application/product/removeAllProducts";
import { makeAddOrder } from "../application/order/addOrder";
import { makeGetProductById } from "../application/product/getProductById";

const inMemoryUserRepository = makeInMemoryUserRepository(uniqueIdGenerator);

 const addUser = makeAddUser(inMemoryUserRepository);
 const updateUser = makeUpdateUser(inMemoryUserRepository);
 const getUserById = makeGetUserById(inMemoryUserRepository);
 const getAllUsers = makeGetAllUsers(inMemoryUserRepository);
 const removeAllUsers = makeRemoveAllUsers(inMemoryUserRepository);
 const addCart = makeAddCart(uniqueIdGenerator, inMemoryUserRepository, getUserById);
 
const inMemoryProductRepository =
    makeInMemoryProductRepository(uniqueIdGenerator);

 const addProduct = makeAddProduct(inMemoryProductRepository);
 const updateProduct = makeUpdateProduct(inMemoryProductRepository);
 const getProductById = makeGetProductById(inMemoryProductRepository);
 const getAllProducts = makeGetAllProducts(inMemoryProductRepository);
 const removeAllProducts = makeRemoveAllProducts(inMemoryProductRepository);

 const addOrderToCart = makeAddOrder(uniqueIdGenerator, inMemoryUserRepository, inMemoryProductRepository, getProductById, getUserById);

 const userService = makeUserService({addUser, updateUser, getUserById, getAllUsers, removeAllUsers, addCart, addOrderToCart});
 const productService = makeProductService({addProduct, updateProduct, getAllProducts, removeAllProducts});

export const services = makeServices({userService, productService});

