import { useQuery } from "@tanstack/react-query";
import { actionTemplate } from "../actions/action-template";

async function fetchTemplate() {
  try {
    const response = await actionTemplate();

    return response;
  } catch (error) {
    return error;
  }
}

export const useTemplate = () => {
  return useQuery({
    queryKey: ["get-template"],
    queryFn: () => fetchTemplate(),
  });
};
