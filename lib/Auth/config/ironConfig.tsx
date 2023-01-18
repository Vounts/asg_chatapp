export const ironOptions = {
  cookieName: process.env.PATIENT_COOKIE || "chatapp_session",
  password:
    process.env.PASSWORD ||
    "xkGzziIC7vTL5ZeTzNdxvgJeGDDu0VxIfvW8gMvcMp9VINDA2p",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    path: "/",
    maxAge: 86400, //24hours only
  },
};
