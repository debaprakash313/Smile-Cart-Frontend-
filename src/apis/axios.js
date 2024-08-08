import { Toastr } from "@bigbinary/neetoui";
import axios from "axios";
import { t } from "i18next";
import { keysToCamelCase, serializeKeysToSnakeCase } from "neetocist";
import { evolve } from "ramda";

const requestInterceptors = () => {
  axios.interceptors.request.use(request =>
    evolve(
      { data: serializeKeysToSnakeCase, params: serializeKeysToSnakeCase },
      request
    )
  );
};

const transformToCamelCase = response => {
  if (response.data) response.data = keysToCamelCase(response.data);
};

const setupHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

const shouldShowToastr = response =>
  typeof response === "object" && response?.noticeCode;

const showSuccessToastr = response => {
  if (shouldShowToastr(response.data)) {
    Toastr.success(response.data);
  }
};

const showErrorToastr = error => {
  if (error.message === t("error.networkError")) {
    Toastr.error(t("error.noInternetConnection"));
  } else if (error.response?.status !== 404) {
    Toastr.error(error);
  }
};

const responseInterceptors = () =>
  axios.interceptors.response.use(
    response => {
      transformToCamelCase(response);
      showSuccessToastr(response);

      return response.data;
    },
    error => {
      showErrorToastr(error);

      return Promise.reject(error);
    }
  );

export default function initializeAxios() {
  axios.defaults.baseURL =
    "https://smile-cart-backend-staging.neetodeployapp.com/";
  setupHeaders();
  responseInterceptors();
  requestInterceptors();
}
