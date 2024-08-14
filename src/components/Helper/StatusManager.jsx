import { useUser } from "../../Providers/UseContent";

export const useErrorHandler = () => {
  const { openAuthorizeModel } = useUser();

  const handleError = (error) => {
    if (error && error.response) {
      (error.response.status === 401) && openAuthorizeModel();
    } else if (error === 401) {
      openAuthorizeModel();
    }
  };

  return handleError;
};
