import { takeLatest, put, all, select, call } from "redux-saga/effects";
import store from "../../../store/store";
import { toast } from "react-toastify";
import ChartService from "../../../service/ChartsService";
import { componentKey, setAllMessages, setChartDetails } from "./ChartSlice";
import { useDispatch, useSelector } from "react-redux";
import Login from "../../login";
import { setSelectedChat } from "../userSlice";

export const {
  getAllChartDetails,
  startNewChartPost,
  sendMessagePost,
  getAllMessage,
} = {
  getAllChartDetails: (payload) => {
    return {
      type: "USER/GET_ALL_CHARTS",
      payload,
    };
  },

  startNewChartPost: (payload) => {
    return {
      type: "USER/START_NEW_CHART",
      payload,
    };
  },
  sendMessagePost: (payload) => {
    console.log("sendMessagePost payload", payload);
    return {
      type: "USER/SEND_NEW_MESSAGE",
      payload,
    };
  },
  getAllMessage: (payload) => {
    return {
      type: "USER/GET_ALL_MESSAGE",
      payload,
    };
  },
};

function* getAllChatsListASync() {
  try {
    const response = yield ChartService.getAllCharts();

    if (response) {
      yield put(setChartDetails(response?.data?.data));
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    yield put(setChartDetails([]));
  }
}

function* startNewChartAsync(action) {
  try {
    const allchartDetails = yield select(
      (state) => state[componentKey]?.allchartDetails || []
    );
    const response = yield ChartService.postNewChart(action?.payload);

    if (response?.data?.success) {
      toast.success(response?.data?.message || "Chat started successfully");
      const newChat = response?.data?.data;
      const updatedChats = [...allchartDetails, newChat];
      yield put(setChartDetails(updatedChats));
      yield put(setSelectedChat(newChat));
    }
  } catch (error) {
    console.error("Error in startNewChartAsync:", error);
    toast.error(error?.response?.data?.message || "Failed to start chat");
    yield put(setChartDetails([]));
  }
}

function* createNewMsgAsync(action) {
  console.log("createNewMsgAsync action", action?.payload);

  try {
    const response = yield ChartService.createNewMsg(action?.payload);
    if (response?.data?.success) {
      toast.success(response?.data?.message || "Message sent successfully");
      yield put(getAllMessage(action?.payload?.chatId));
    }
  } catch (error) {
    console.error("Error in startNewChartAsync:", error);
    toast.error(error?.response?.data?.message || "Failed to send message");
  }
}

function* getAllChatsAsync(action) {
  console.log("getAllChatsAsync action", action?.payload);

  try {
    const response = yield ChartService.getAllMessage(action?.payload);
    if (response) {
      yield put(setAllMessages(response?.data?.data));
      toast.success("Messages fetched successfully");
    } else {
      yield put(setAllMessages([]));
    }
  } catch (error) {
    console.error("Error in getAllChats:", error);
    toast.error(error?.response?.data?.message || "Failed to fetch messages");
    yield put(setAllMessages([]));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(getAllChartDetails().type, getAllChatsListASync),
    takeLatest(startNewChartPost().type, startNewChartAsync),
    takeLatest(sendMessagePost().type, createNewMsgAsync),
    takeLatest(getAllMessage().type, getAllChatsAsync),
  ]);
}

store.sagaManager.addSaga(componentKey, rootSaga);
