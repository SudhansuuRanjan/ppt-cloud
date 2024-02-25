import { Outlet, Navigate } from "react-router-dom";
// import { useAuthStatus } from "../hooks/useAuthStatus";
import { useAuth } from "../context/AuthContext";

export default function Protected() {
    const { currentUser } = useAuth();
    return currentUser ? <Outlet /> : <Navigate to="/" />;
}