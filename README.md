# Getting Started with Clean DDD front POC

This project demonstrates the DDD and Clean Architecture concepts used for Front

## Clean Architecture and Domain Driven Design

### Domain
In the domain directory you will find the domain entities :
- Product : a simple Product entity
- User : the User entity contains carts, carts contains orders, orders are linked to a Product entity.

There is no domain entity for carts and orders as they can not exist without a User (DDD).
Domain entities do not depend on anything (DDD and Clean Architecture).

### Application
In the application (DDD denomitation of UseCases in Clean Architecture) you will find the use cases for mutating the domain entities.
They only depends on domain entities.
The use cases are factories with injected dependencies based on interfaces (here IUserRepository and IProductRepository).
These repository interfaces could be implemented with any infrastructure repository such as MongoDB, PostGreSQL, etc... here, for demo purpose, I choose in memory repositories.
It helps to not depend on any outside framework, tools, etc. and it is easier to test the domain business logic.
Furthermore the change of any new framework, tool, library, outside technology SHOULD NOT change the domain business logic implementation !

### Adapters
The various objects DTO (Data Transfer Object) used to convert outside object to/from domain.

### ioc.ts
IOC (Inversion Of Control) is the only place where ALL the dependencies injections are done. It is very simple to change the implementation used for each interface.

### Frameworks (sometimes called Infrastructure)
In the framework directory you will find the repositories implementations and the UI implementation (here in ReactJS).

### Observer
I often use the observer pattern to trigger events in order for listeners to react.
For example, here, when a product/user is created, updated, etc. it triggers an event to request the new list in order to update the displayed information.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
