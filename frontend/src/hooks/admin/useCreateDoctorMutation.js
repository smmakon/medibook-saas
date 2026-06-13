import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createDoctor } from "../../services/adminService";

export function useCreateDoctorMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDoctor,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["doctors"],
      });

      toast.success(
        data.message ||
          "Doctor created"
      );
    },

    onError: (error) => {
      toast.error(
        error.message ||
          "Error when creating"
      );
    },
  });
}