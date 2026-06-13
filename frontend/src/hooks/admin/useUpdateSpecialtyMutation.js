import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { updateSpecialty } from "../../services/adminService";

export function useUpdateSpecialtyMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      updateSpecialty(id, data),

    onSuccess: (data) => {
      toast.success(
        data.message ||
          "Specialty updated successfully"
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