import { useQuery } from "@tanstack/react-query";

async function fetchTemplate() {
  try {
    return [10, 20, 30, 40];
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
