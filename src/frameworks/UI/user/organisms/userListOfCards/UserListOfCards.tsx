import { UserPresenterDto } from "../../../../../adapters/UserDto";
import { ListOfCards } from "../../../components/atoms/listOfCards/ListOfCards";
import { UserCard } from "../../molecules/userCard/UserCard";

export interface UserListOfCardsProps {
    usersList: UserPresenterDto[];
    selectUser: (user: UserPresenterDto) => void;
    selectedUser: UserPresenterDto | undefined;
}

export const UserListOfCards: React.FC<UserListOfCardsProps> = ({
    usersList,
    selectUser,
    selectedUser,
}) => (
    <ListOfCards>
        {usersList.map((user) => (
            <UserCard
                key={user.id}
                onClick={() => selectUser(user)}
                selected={
                    selectedUser! && selectedUser.id === user.id
                }
                user={user}
            />
        ))}
    </ListOfCards>
);
