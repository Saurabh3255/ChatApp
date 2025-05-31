import { all, put, takeLatest } from "redux-saga/effects";
import { componentKey } from "./SignupSlice";
import store from "../../store/store";
import { toast } from "react-toastify";
import AuthDataService from "../../service/SignUpService";
import { useNavigate } from "react-router-dom";

export const { postsignup } = {
  postsignup: (payload) => {
    console.log("payload", payload);

    return {
      type: "USER/SIGNUP",
      payload,
    };
  },
};

function* signUpUserAsync(action) {
  console.log("action", action);
  try {
    const { values, navigate } = action?.payload;
    const response = yield AuthDataService.postsignup(values);
    console.log("response", response);

    if (response?.status) {
      toast.success(response?.data?.message || "Signup successful!");
      navigate("/login");
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Signup failed");
    console.log("Signup error: ", error);
  }
}

function* rootSaga() {
  yield all([takeLatest(postsignup().type, signUpUserAsync)]);
}

store.sagaManager.addSaga(componentKey, rootSaga);
