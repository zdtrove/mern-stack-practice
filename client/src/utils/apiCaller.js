import axios from "axios";

const apiCaller = (method, router, endpoint, body) => {
    return axios({
        method,
        url: `/api/${router}/${endpoint}`,
        data: body
    });
};
export default apiCaller;