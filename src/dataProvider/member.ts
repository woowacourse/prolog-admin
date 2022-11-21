const memberProvider = {
  getUsers() {
    return fetch(`${process.env.REACT_APP_API_URL}/members`).then((res) =>
      res.json()
    );
  },
};

export { memberProvider };
