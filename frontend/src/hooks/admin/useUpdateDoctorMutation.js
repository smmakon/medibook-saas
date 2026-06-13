import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateDoctor } from "../../services/adminService";

export function useUpdateDoctorMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      updateDoctor(id, data),

    onSuccess: () => {
      toast.success("Doctor updated");
      qc.invalidateQueries({
        queryKey: ["doctors"],
      });
    },

    onError: (e) => toast.error(e.message),
  });
}