import "./Main.css";

import { UsersTemplate } from "../../user/templates/UsersTemplate";
import { ProductsTemplate } from "../../product/templates/ProductsTemplate";

function Main() {
 
     return (
        <div className="appContainer">
            <UsersTemplate />
            <ProductsTemplate />
        </div>
    );
}

export default Main;
