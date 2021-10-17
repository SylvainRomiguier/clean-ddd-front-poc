import {  ProductService } from "./product/productService";
import {  UserService } from "./user/userService";

interface IConfiguration {
    userService: UserService;
    productService: ProductService;
}

interface Services {
    userService: UserService;
    productService: ProductService;
}

export const makeServices = (configuration: IConfiguration):Services => ({
    userService: configuration.userService,
    productService: configuration.productService,

});