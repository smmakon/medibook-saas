import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { createSpecialty } from "../../services/adminService";

export function useCreateSpecialtyMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createSpecialty,

    onSuccess: (data) => {
      toast.success(
        data.message ||
          "Specialty created successfully"
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