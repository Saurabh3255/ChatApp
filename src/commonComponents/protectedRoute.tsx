import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { componentKey } from "../pages/Home/UserSlice";
import { getUserDetails } from "../pages/Home/UserSaga";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetails } = useSelector(
    (state: any) => state[componentKey] || {}
  );
  console.log("user Details", userDetails);

  useEffect(() => {
    const checkUser = localStorage.getItem("token");
    if (checkUser) {
      dispatch(getUserDetails());
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <p>Name:{userDetails?.firstName + " " + userDetails?.lastName}</p>
      <p>Email:{userDetails?.email}</p>
      {children}
    </div>
  );
}

export default ProtectedRoute;
