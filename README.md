# Getting Started with Clean DDD front POC

This project demonstrates the DDD and Clean Architecture concepts

## Clean Architecture, Domain Driven Design, Atomic Design

### Domain
In the domain directory you will find the domain entities :
- Product : a Product entity
- User : the User entity contains carts, carts contains orders, orders are linked to a Product entity.

There is no domain entity for carts and orders as they can not exist without a User (DDD).
Domain entities do not depend on anything (DDD and Clean Architecture).

Business logic : entities are composed by value objects, contain methods, representing business logic with validation and mutation.

### Application
In the application (DDD denomitation of UseCases in Clean Architecture) you will find the use cases for mutating the domain entities.
They only depends on domain entities.
The use cases are factories with injected dependencies based on interfaces (here IUserRepository and IProductRepository) or other useCases.
These repository interfaces could be implemented with any infrastructure repository such as REST API server, Web Sockets, MongoDB, PostGreSQL, etc... here, for demo purpose, I have chosen in memory repositories.
It helps to not depend on any outside framework, tools, etc. and it is easier to test the domain business logic (entities and use cases).
Furthermore the change of any new framework, tool, library, outside technology, SHOULD NOT change the business logic domain implementation !

### Adapters
The various objects DTO (Data Transfer Object) used to convert outside object to/from domain.

### Services
IOC (Inversion Of Control) is the only place where ALL the dependencies injections are done. It is very simple to change the implementation used for each interface or to inject a mockup configuration of services to test your business logic application.

#### services : Facade pattern
Here services is a Facade pattern to expose many services in a convenient way and injecting events emission to events listeners.

#### services : Observer pattern
I often use the observer pattern to trigger events in order for listeners to react.
For example, here, when a product/user is created, updated, etc. it triggers an event to request the new list in order to update the displayed information.

### Frameworks (sometimes called Infrastructure)
In the framework directory you will find the repositories implementations and the UI implementation (here in ReactJS but you should implement Angular, VueJS, or even console command/display, etc... without changing any business logic).

#### Atomic Design
The UI components are distributed in Atoms (basic building blocks), Molecules (blocks composend by Atoms), Organisms (more complex components composed by Molecules/Atoms), Templates (design how blocks with a homogeneous concern should be displayed), pages (contains all the state logic and methods to provide data and mutation methods to templates. This is the only entry point in UI linked to services providing data and data mutation methods. All other components such as atoms, molecules and templates should not be linked to services and could be tested independently).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
