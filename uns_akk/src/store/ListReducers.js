const initialState = {
  professors: [],
  userRole: 0,
};
export const ListReducers = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ROLE":
      return { ...state, userRole: action.payload };
    case "SET_PROFESSORS":
      return { ...state, professors: action.payload };
    case "ADD_PROFESSOR":
      return { ...state, professors: [...state.professors, action.payload] };
    case "UPDATE_PROFESSOR":
      return {
        ...state,
        professors: state.professors.map((professor) =>
          professor.id === action.payload.id
            ? action.payload.professor
            : professor
        ),
      };

    case "DELETE_PROFESSOR":
      return {
        ...state,
        professors: state.professors.filter(
          (professor) => professor.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
