import { makeAddUser } from "../application/user/addUser";
import { makeInMemoryUserRepository } from "../frameworks/repositories/InMemoryUserRepository";
import { UserControllerDto, UserPresenterDto } from "../adapters/UserDto";
import { makeUpdateUser } from "../application/user/updateUser";
import { User } from "../domain/user";

describe("test User", () => {
    const uniqueIdGenerator = () => "12345";
    const userRepository = makeInMemoryUserRepository(uniqueIdGenerator);
    const addUser = makeAddUser(userRepository);
    const updateUser = makeUpdateUser(userRepository);
    it("add a valid user", async () => {
        const user = await addUser(
            new UserControllerDto(
                undefined,
                "User Name",
                "Password1",
                "Sylvain",
                "Romiguier"
            )
        );
        return expect(JSON.stringify(user)).toBe(
            JSON.stringify(
                new UserPresenterDto(
                    "12345",
                    "User Name",
                    "Sylvain",
                    "Romiguier",
                    []
                )
            )
        );
    });
    it("add a user with a bad user name", async () => {
        await expect(
            addUser(
                new UserControllerDto(
                    undefined,
                    "Use",
                    "Password1",
                    "Sylvain",
                    "Romiguier"
                )
            )
        ).rejects.toThrow("Username should have at least 5 characters");
    });
    it("add a user with a bad password", async () => {
        await expect(
            addUser(
                new UserControllerDto(
                    undefined,
                    "User Name",
                    "Passwo",
                    "Sylvain",
                    "Romiguier"
                )
            )
        ).rejects.toThrow(
            "Password should have at least 6 characters, one lower case, one upper case, one digit."
        );
    });
    it("update a valid user", async () => {
        const user = await updateUser(
            new UserControllerDto(
                "12345",
                "An other username",
                "Password1",
                "Raoul",
                "Volfoni"
            )
        );
        return expect(JSON.stringify(user)).toBe(
            JSON.stringify(
                new UserPresenterDto(
                    "12345",
                    "An other username",
                    "Raoul",
                    "Volfoni",
                    []
                )
            )
        );
    });
    it("update a user without providing an explicit id", async () =>
        await expect(
            updateUser(
                new UserControllerDto(
                    undefined,
                    "User Name",
                    "Password1",
                    "Sylvain",
                    "Romiguier"
                )
            )
        ).rejects.toThrow("Unable to update an user without explicit id"));
        it("test equality between 2 domain users", async () => {
            const user = new User("user name", "12345", "Password1", "Sylvain", "Romiguier");
            const otherUser = new User("user name", "12345", "Password1", "Sylvain", "Romiguier");
            return expect(user.isEqualTo(otherUser)).toBe(true);
        });
        it("test inequality between 2 domain users", async () => {
            const user = new User("user name", "12345", "Password1", "Sylvain", "Romiguier");
            const otherUser = new User("user name", "12346", "Password1", "Sylvain", "Romiguier");
            return expect(user.isEqualTo(otherUser)).toBe(false);
        });
});
