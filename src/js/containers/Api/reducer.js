function api(state, action) {
  if (!state) {
    return {
      url: 'http://localhost:8000/dashboard/api'
    };
  }

  return state;
}

export default api;
