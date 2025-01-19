const PATH = {
  // AUTH
  LOGIN: "/auth/login-jwt",
  LOGOUT: "/auth/logout",
  JWT_AUTH: "/jwtAuthAPI",
  REFRESHTOKEN_AUTH: "/refreshTokenAuth",

  // SIGNUP
  SIGNUP: "/etc/member_insert",

  // DELETE USER
  DELETE_USER: "mypage/delete",

  // DUPLICATE CHECK
  CHECK_DUPLICTE_ID: (id) => `/etc/member_checkid/${id}`,

  // BOARD
  BOARD: "/board",
  BOARD_DETAIL: (bbsId, nttId) => `/board/${bbsId}/${nttId}`,
};

export { PATH }
