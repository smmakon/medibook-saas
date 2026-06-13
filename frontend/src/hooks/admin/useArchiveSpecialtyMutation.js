import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { archiveSpecialty } from "../../services/adminService";

export function useArchiveSpecialtyMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: archiveSpecialty,

    onSuccess: (data) => {
      toast.success(
        data.message ||
          "Specialty archived successfully"
      );

      qc.invalidateQueries({
        queryKey: ["specialties"],
      });
    },

    onError: (e) => {
      toast.error(e.message);
    },
  });
}