import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  useEffect(() => {
    const checkUser = localStorage.getItem("token");
    if (checkUser) {
      //write the logic to get the details user
    } else {
      navigate("/login");
    }
  }, []);
  return <div>{children}</div>;
}

export default ProtectedRoute;
