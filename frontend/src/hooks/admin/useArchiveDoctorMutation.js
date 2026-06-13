import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { archiveDoctor } from "../../services/adminService";

export function useArchiveDoctorMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: archiveDoctor,

    onSuccess: () => {
      toast.success("Doctor archived");
      qc.invalidateQueries(["doctors"]);
    },

    onError: (e) => toast.error(e.message),
  });
}