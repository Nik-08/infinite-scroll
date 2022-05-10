export const login = (payload: LoginPayload) => {
  return {
    type: "LOGIN",
    payload,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
