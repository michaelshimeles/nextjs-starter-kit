import { useQuery } from "@tanstack/react-query";
import { actionTemplate } from "../actions/action-template";

export const useTemplate = () => {
  return useQuery({
    queryKey: ["get-template"],
    queryFn: () => actionTemplate(),
  });
};
