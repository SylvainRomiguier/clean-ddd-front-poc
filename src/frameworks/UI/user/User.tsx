import { UserPresenterDto } from "../../../adapters/UserDto";
import "./User.css";

export interface UserCardProps {
    user: UserPresenterDto;
    onClick: () => void;
    selected: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({
    user,
    onClick,
    selected,
}) => {
    return (
        <div
            className={`userCard ${selected && "userSelected"}`}
            onClick={onClick}
        >
            <div>{user.id}</div>
            <div>{user.userName}</div>
            <div>{user.firstName && user.firstName}</div>
            <div>{user.lastName && user.lastName}</div>
        </div>
    );
};
