import { UserPresenterDto, userPresenterDtoToDomain } from "../../../../../adapters/UserDto";
import { services } from "../../../../../services/ioc";
import { Button } from "../../../components/atoms/button/Button";

export interface UserDetailsProps {
    user: UserPresenterDto;
}

export const UserDetails:React.FC<UserDetailsProps> = ({user}) => {

    const onCreateCart = async () => {
        
    };

    return (<div>
        <div>Id : {user.id}</div>
        <div>User name : {user.userName}</div>
        <div>{user.firstName}  {user.lastName}</div>
        <Button onClick={onCreateCart}>Ajouter panier</Button>
    </div>)
}