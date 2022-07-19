import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import ROUTE from "../configs/route";

const PrivateRoutes = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={(props) =>
                !(Object.keys(user).length === 0) ? (
                    <Component {...props} />
                ) : (
                    <Redirect exact to={ROUTE.LOGIN} />
                )
            }
        />
    );
};

export default PrivateRoutes;
