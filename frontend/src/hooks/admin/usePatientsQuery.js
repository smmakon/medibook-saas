import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../../services/adminService";

export function usePatientsQuery({
  page,
  search,
}) {
  return useQuery({
    queryKey: ["patients", page, search],

    queryFn: () =>
      getPatients({
        page,
        search,
        limit: 10,
      }),

    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}