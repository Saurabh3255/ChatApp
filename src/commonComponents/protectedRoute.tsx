import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { componentKey } from "../pages/Home/userSlice";
import { getUserDetails } from "../pages/Home/UserSaga";
import { getAllChartDetails } from "../pages/Home/HomeComponent/ChartsSaga";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = localStorage.getItem("token");
    if (checkUser) {
      dispatch(getUserDetails());
      dispatch(getAllChartDetails());
    } else {
      navigate("/login");
    }
  }, []);

  return <div>{children}</div>;
}

export default ProtectedRoute;
