import ordersApi from "apis/orders";
import { useMutation } from "react-query";

export const useCreateOrder = () => useMutation(ordersApi.create);
