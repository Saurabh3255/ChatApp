import store from "../../../store/store";

export const componentKey = "All_Charts_Details";

const { actions } = store.reducerManager.add({
  key: componentKey,
  addedReducers: {
    setChartDetails: (state, action) => {
      state.allchartDetails = action.payload;
    },
    setAllMessages: (state, action) => {
      state.allMessage = action.payload;
    },
  },
  initialReducerState: {
    allchartDetails: [],
    allMessage: [],
  },
});

export const { setChartDetails, setAllMessages } = actions;
