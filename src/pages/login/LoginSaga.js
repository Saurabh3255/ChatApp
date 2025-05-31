import { all, put, takeLatest } from "redux-saga/effects";
import { componentKey } from "./LoginSlice";
import store from "../../store/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoginDataService from "../../service/LoginService";

export const { loginPost } = {
  loginPost: (payload) => {
    return {
      type: "USER/LOGIN",
      payload,
    };
  },
};

function* loginUserPostAsync(action) {
  console.log("Action", action);
  try {
    const { values, navigate } = action?.payload;
    const response = yield LoginDataService.postLogin(values);
    console.log("response", response);
    if (response?.status === 200) {
      toast.success(response?.data?.message || "Login successful!");

      localStorage.setItem("token", response?.token);
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
      //   window.location.href = "/";
      navigate("/");
    }
  } catch (error) {
    console.log("error", error);
    toast.error(error?.response?.data?.message || "Login failed");
  }
}

function* rootSaga() {
  yield all([takeLatest(loginPost().type, loginUserPostAsync)]);
}

store.sagaManager.addSaga(componentKey, rootSaga);
