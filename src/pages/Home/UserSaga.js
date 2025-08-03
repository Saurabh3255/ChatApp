import { componentKey, setAllUserDetails, setUserDetails } from "./UserSlice";
import { takeLatest, put, all } from "redux-saga/effects";
import store from "../../store/store";
import UserInformationService from "../../service/UserInformationService";
import { toast } from "react-toastify";

export const { getUserDetails, getAllUserDetails } = {
  getUserDetails: (payload) => {
    return {
      type: "USER/GET_USER_LOGGED_IN_DETAILS",
      payload,
    };
  },
  getAllUserDetails: (payload) => {
    return {
      type: "USER/GET_ALL_USER_DETAILS",
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
    window.location.href = "/login";
  }
}

function* getAllUserDetailsAsync() {
  try {
    const response = yield UserInformationService.getAllUserInformation();
    if (response) {
      yield put(setAllUserDetails(response?.data));
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    yield put(setAllUserDetails({}));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(getUserDetails().type, getLoginUserDetailsAsync),
    takeLatest(getAllUserDetails().type, getAllUserDetailsAsync),
  ]);
}

store.sagaManager.addSaga(componentKey, rootSaga);
