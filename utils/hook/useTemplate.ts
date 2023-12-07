import { useQuery } from "@tanstack/react-query";

async function fetchTemplate() {
  try {
    return;
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
