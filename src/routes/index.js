import { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { appRoutes } from "./appRoutes";
import PublicRoutes from "./publicRoutes";
import PrivateRoutes from "./privateRoutes";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";

const AppRouter = () => {
    // eslint-disable-next-line no-lone-blocks
    {
        /* Lấy các trang cần đăng nhập mới xem được */
    }
    const publicRoutes = appRoutes.filter(
        (privateRoute) => !privateRoute.isPrivate
    );
    // eslint-disable-next-line no-lone-blocks
    {
        /* Lấy các trang không cần đăng nhập mới xem được */
    }
    const privateRoutes = appRoutes.filter(
        (privateRoute) => privateRoute.isPrivate
    );

    return (
        <Suspense fallback={<Loading />}>
            <Layout>
                <Switch>
                    {publicRoutes.map((publicRoute) => (
                        <PublicRoutes
                            key={publicRoute.path}
                            exact
                            component={publicRoute.component}
                            path={publicRoute.path}
                        />
                    ))}
                    {privateRoutes.map((privateRoute) => (
                        <PrivateRoutes
                            key={privateRoute.path}
                            exact
                            component={privateRoute.component}
                            path={privateRoute.path}
                        />
                    ))}
                    <Route exact component={Login} path="/login" />
                    <Route exact component={NotFound} path="/*" />
                </Switch>
            </Layout>
        </Suspense>
    );
};

export default AppRouter;
