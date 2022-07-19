import React from "react";
import routes from "../configs/route";

const Home = React.lazy(() => import("../pages/Home"));
const ChangePassword = React.lazy(() => import("../pages/ChangePassword"));
const ResetEnergy = React.lazy(() => import("../pages/ResetEnergy"));
const UpdatePrice = React.lazy(() => import("../pages/UpdatePrice"));
const History = React.lazy(() => import("../pages/History"));
const ElectricNumber = React.lazy(() => import("../pages/ElectricNumber"));
const Current = React.lazy(() => import("../pages/Current"));
const PowerWarning = React.lazy(() => import("../pages/PowerWarning"));

export const appRoutes = [
    {
        path: routes.OVERVIEW,
        component: Home,
        isPrivate: false,
    },
    {
        path: routes.ENERGY_CHART,
        component: ElectricNumber,
        isPrivate: true,
    },
    { path: routes.CURRENT_CHART, component: Current, isPrivate: true },
    {
        path: routes.HISTORY,
        component: History,
        isPrivate: true,
    },
    {
        path: routes.CHANGE_PASSWORD,
        component: ChangePassword,
        isPrivate: true,
    },
    {
        path: routes.RESET_ENERGY,
        component: ResetEnergy,
        isPrivate: true,
    },
    {
        path: routes.UPDATE_PRICE,
        component: UpdatePrice,
        isPrivate: true,
    },
    {
        path: routes.POWER_WARNING,
        component: PowerWarning,
        isPrivate: true,
    },
];
