import { useQuery } from "@tanstack/react-query";
import { template } from "../db/template/template";

async function fetchTemplate() {
  try {
    const response = await template();

    return response
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
