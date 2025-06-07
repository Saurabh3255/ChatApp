import { componentKey, setUserDetails } from "./UserSlice";
import { takeLatest, put, all } from "redux-saga/effects";
import store from "../../store/store";
import UserInformationService from "../../service/UserInformationService";
import { toast } from "react-toastify";

export const { getUserDetails } = {
  getUserDetails: (payload) => {
    return {
      type: "USER/GET_USER_LOGGED_IN_DETAILS",
      payload,
    };
  },
};

function* getLoginUserDetailsAsync() {
  try {
    const response = yield UserInformationService.getLoginUserInforamtion();
    if (response) {
      yield put(setUserDetails(response?.data?.data));
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    yield put(setUserDetails({}));
    window.location.href = "/login";
  }
}

function* rootSaga() {
  yield all([takeLatest(getUserDetails().type, getLoginUserDetailsAsync)]);
}

store.sagaManager.addSaga(componentKey, rootSaga);
