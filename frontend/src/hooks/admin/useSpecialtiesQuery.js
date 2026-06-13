import { useQuery } from "@tanstack/react-query";
import { getSpecialties } from "../../services/adminService";

export function useSpecialtiesQuery({
  page = 1,
  search = "",
} = {}) {
  return useQuery({
    queryKey: ["specialties", page, search],

    queryFn: () =>
      getSpecialties({
        page,
        search,
        limit: 10,
      }),

    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}