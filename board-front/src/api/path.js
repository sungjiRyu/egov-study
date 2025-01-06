const PATH = {
  // AUTH
  LOGIN: "/auth/login-jwt",
  LOGOUT: "/auth/logout",

  // BOARD
  BOARD: "/board",
  BOARD_DETAIL: (bbsId, nttId) => `/board/${bbsId}/${nttId}`,

  // SIGNUP
  SIGNUP: "/etc/member_insert",
};

export default PATH;
