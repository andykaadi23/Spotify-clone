function setToken(token) {
  return {
    type: "set_token",
    payload: token,
  };
}

export default setToken;
