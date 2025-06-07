import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { componentKey } from "../pages/Home/userSlice";
import { getUserDetails } from "../pages/Home/UserSaga";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = localStorage.getItem("token");
    if (checkUser) {
      dispatch(getUserDetails());
    } else {
      navigate("/login");
    }
  }, []);

  return <div>{children}</div>;
}

export default ProtectedRoute;
