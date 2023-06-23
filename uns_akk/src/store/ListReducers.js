const token = "";
const showmobile_landing = false;

export const TokenReducers = (state = token, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return { token: action.payload };
    case "REMOVE_TOKEN":
      return { token: null };
    default:
      return state;
  }
};
export const MobileReducers = (state = showmobile_landing, action) => {
  switch (action.type) {
    case "MOBILE_LANDING":
      return { showmobile_landing: action.payload };
    default:
      return state;
  }
};
