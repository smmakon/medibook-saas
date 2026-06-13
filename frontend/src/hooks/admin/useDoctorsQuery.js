import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "../../services/adminService";

export function useDoctorsQuery({
  page,
  search,
}) {
  return useQuery({
    queryKey: ["doctors", page, search],

    queryFn: () =>
      getDoctors({
        page,
        search,
        limit: 10,
      }),

    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}