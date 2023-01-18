import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { findUser } from "@/lib/Auth/authentication";
import { validatePassword } from "@/lib/Auth/authentication";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "@/lib/Auth/config/ironConfig";
declare module "iron-session" {
  interface IronSessionData {
    user?: any;
  }
}
export default withIronSessionApiRoute(async function loginRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { username, password } = req.body;

  const user = await findUser(username);
  if (!user) {
    res.status(400).json({ message: "Failed to find patientId" });
  } else {
    if (validatePassword(user, password)) {
      Reflect.deleteProperty(user, "password");
      req.session.user = user;

      await req.session.save();

      res.status(200).json({ message: "Successfully logged-in", user: user });
    } else {
      res.status(400).json({ message: "Invalid Password" });
    }
  }
},
ironOptions);
