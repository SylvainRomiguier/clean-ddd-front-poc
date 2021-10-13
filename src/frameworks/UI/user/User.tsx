import { UserPresenterDto } from "../../../adapters/UserDto";
import "./User.css";

export interface UserCardProps {
    user: UserPresenterDto;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
    return (
        <div className="userCard">
            <div>{user.id}</div>
            <div>{user.userName}</div>
            <div>{user.firstName && user.firstName}</div>
            <div>{user.lastName && user.lastName}</div>
        </div>
    );
};
