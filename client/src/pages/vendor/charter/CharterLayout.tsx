// src/components/ProtectedRoute.js
import { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import vendorApi from "../functions/vendorApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setVendor } from "../store/reduxSlice";
import Sidebar from "../application/sidebar";

const CharterLayout = () => {
  const [authStatus, setAuthStatus] = useState("loading");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await vendorApi.get("/user");
        if (response.data.success) {
          dispatch(setVendor(response.data.vendor));
          const vendor = response.data.vendor;
          if (vendor.serviceType !== "jet_charter") {
            setAuthStatus("unauthorized");
            toast.error("Access restricted: Invalid service type.");
            navigate("/unauthorized"); // Redirect to an unauthorized page or another route
            return;
          }
          setAuthStatus("authenticated");
        } else {
          setAuthStatus("unauthenticated");
          toast("Session expired. Please log in again.");
          navigate("/");
        }
      } catch (err: any) {
        setAuthStatus("unauthenticated");
        if (err.response?.status === 401) {
          toast.error("Your session has expired");
        } else {
          toast("Authentication check failed");
        }
        navigate("/");
      }
    };

    verifyAuth();
  }, [dispatch, navigate]);

  if (authStatus === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (authStatus === "unauthenticated") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="">
      <div className="flex ml-72">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default CharterLayout;
