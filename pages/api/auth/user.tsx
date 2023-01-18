import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import response from "@/lib/Http/Response";
import { findUser } from "@/lib/Auth/authentication";
import { withSessionApi } from "@/lib/Auth/authentication";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.body;

  if (username) {
    const user = findUser(username);
    if (user) {
      res.status(200).json(user);
    } else {
      response(res, 401, "Failed to register user");
    }
  }
}

export default withSessionApi(handler);
