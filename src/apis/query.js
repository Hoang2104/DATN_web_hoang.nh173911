import api from "./api";

export const execute = async (body) => {
    const data = await api({
        method: "POST",
        url: `/query?api-version=1.2-preview`,
        data: body,
    });
    return data;
};
