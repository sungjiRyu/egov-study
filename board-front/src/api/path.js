const PATH = {
  // AUTH
  LOGIN: "/auth/login-jwt",
  LOGOUT: "/auth/logout",

  // BOARD
  BOARD: "/board",
  BOARD_DETAIL: (bbsId, nttId) => `/board/${bbsId}/${nttId}`,

  // SIGNUP
  SIGNUP: "/etc/member_insert",

  // DUPLICATE CHECK
  CHECK_DUPLICTE_ID: (id) => `/etc/member_checkid/${id}`
};

export { PATH }
