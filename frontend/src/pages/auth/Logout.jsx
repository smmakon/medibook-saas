import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ROUTES } from "../../routes/routes";
import { useAuth } from "../../context/AuthContext";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    toast.success("Logged out successfully");
    navigate(ROUTES.LOGIN, { replace: true });
  }, [logout, navigate]);

  return null;
}