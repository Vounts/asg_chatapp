import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "@/lib/Auth/config/ironConfig";

export default withIronSessionApiRoute(function logoutRoute(
  req: any,
  res: any
) {
  req.session.destroy();
  res.redirect(200, "/login");
},
ironOptions);
