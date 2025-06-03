import store from "../store/store";

export const componentKey = "LOADER";

const { actions } = store.reducerManager.add({
  key: componentKey,
  addedReducers: {
    setLoaderState: (state, action) => {
      state.isloader = action.payload;
    },
  },
  initialReducerState: {
    isloader: false,
  },
});
export const { setLoaderState } = actions;
