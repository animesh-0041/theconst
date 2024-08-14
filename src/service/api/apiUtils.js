import { apiServiceWithToken } from "./apiService";

export const Privateauth = async (url, body = null) => {

  try {
    if (body) {
      const response = await apiServiceWithToken.post(url, body);
      return response;
    } else {
      const response = await apiServiceWithToken.post(url);
      return response;
    }
  } catch (err) {
    console.log(err?.response?.status, "error mater");
  }
};
