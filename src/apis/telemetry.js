import api from "./api";
import app from "../configs/app";

export const getTelemetryValue = async (name) => {
    const data = await api({
        method: "GET",
        url: `/devices/${app.DEVICE_ID}/telemetry/${name}?api-version=1.2-preview`,
    });
    return data;
};
