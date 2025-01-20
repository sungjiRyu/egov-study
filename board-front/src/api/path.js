const PATH = {
  // AUTH
  LOGIN: "/auth/login-jwt",
  LOGOUT: "/auth/logout",
  JWT_AUTH: "/jwtAuthAPI",
  REFRESHTOKEN_AUTH: "/refreshTokenAuth",
  FIND_ID: "/find/id",
  FIND_PWD: "/find/pwd",

  // SIGNUP
  SIGNUP: "/etc/member_insert",

  // USERINFO MODIFY
  UPDATE_USERINFO: "mypage/update",
  // DELETE USER
  DELETE_USER: "mypage/delete",

  // DUPLICATE CHECK
  CHECK_DUPLICTE_ID: (id) => `/etc/member_checkid/${id}`,

  // BOARD
  BOARD: "/board",
  BOARD_DETAIL: (bbsId, nttId) => `/board/${bbsId}/${nttId}`,
};

export { PATH }
