import store from "../../store/store";

export const componentKey = "LOGIIN";

const { actions } = store.reducerManager.add({
  key: componentKey,
  addedReducer: {
    setSignUpState: (state, action) => {
      state.signup = action.payload;
    },
  },
  initialReducerState: {
    isSignUp: false,
  },
});
export const { setSignUpState } = actions;
