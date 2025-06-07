import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import Login from "./pages/login";
import Signup from "./pages/signup/index";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./commonComponents/protectedRoute";
import Loader from "./commonComponents/loader";
import { useDispatch, useSelector } from "react-redux";
import { componentKey, setLoaderState } from "./SliceForLoader/loaderSlice";
import { useEffect } from "react";
import axios from "axios";
import Profile from "./pages/Home/HomeComponent/Profile";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state[componentKey]?.isloader);

  useEffect(() => {
    // Store original request function
    const axiosRequest = axios.Axios.prototype.request;

    const requestInterceptor = axios.interceptors.request.use(
      function (config) {
        config.metadata = { isApiRequest: true };
        dispatch(setLoaderState(true));
        return config;
      },
      function (error) {
        if (error.config?.metadata?.isApiRequest) {
          dispatch(setLoaderState(false));
        }
        return Promise.reject(error);
      }
    );

    // Response interceptor
    const responseInterceptor = axios.interceptors.response.use(
      function (response) {
        if (response.config?.metadata?.isApiRequest) {
          dispatch(setLoaderState(false));
        }
        return response;
      },
      function (error) {
        if (error.config?.metadata?.isApiRequest) {
          dispatch(setLoaderState(false));
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // Cleanup interceptors when component unmounts
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [dispatch]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      {isLoading ? <Loader /> : null}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
