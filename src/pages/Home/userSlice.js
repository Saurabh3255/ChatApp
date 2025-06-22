import store from "../../store/store";

export const componentKey = "LOGIN_USER_DEATILS";

const { actions } = store.reducerManager.add({
  key: componentKey,
  addedReducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setAllUserDetails: (state, action) => {
      state.alluserDetails = action.payload;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action?.payload;
    },
  },
  initialReducerState: {
    userDetails: {},
    alluserDetails: [],
    selectedChat: null,
  },
});

export const { setUserDetails, setAllUserDetails, setSelectedChat } = actions;
