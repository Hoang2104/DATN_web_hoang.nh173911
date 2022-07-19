import app from "../configs/app";
import api from "./api";

export const runCommand = async (body) => {
    const data = await api({
        method: "POST",
        url: `/devices/${app.DEVICE_ID}/commands/${app.COMMAND_NAME}?api-version=1.2-preview`,
        data: body,
    });
    return data;
};
