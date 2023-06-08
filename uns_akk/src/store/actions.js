import Encryption from "../auth/Encryption";

export const setProfessors = (professors) => ({
  type: "SET_PROFESSORS",
  payload: JSON.parse(Encryption.Decrypt(professors)),
});

export const addProfessor = (professor) => ({
  type: "ADD_PROFESSOR",
  payload: professor,
});

export const updateProfessor = (id, professor) => ({
  type: "UPDATE_PROFESSOR",
  payload: { id, professor },
});

export const deleteProfessor = (id) => ({
  type: "DELETE_PROFESSOR",
  payload: id,
});

export const setRole = (id) => ({
  type: "SET_ROLE",
  payload: id,
});
export const setToken = (token) => ({
  type: "SET_TOKEN",
  payload: token,
});
export const removeToken = () => ({
  type: "REMOVE_TOKEN",
});
