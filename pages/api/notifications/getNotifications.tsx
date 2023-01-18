import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import cuid from "cuid";
import response from "@/lib/Http/Response";
import { findUser } from "@/lib/Auth/authentication";
import { withSessionApi } from "@/lib/Auth/authentication";
import CatchError from "@/lib/Error/catch";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = req.session.user;

  try {
    const notifs = await prisma.notifications.findMany({
      where: {
        userId: {
          equals: user?.id,
        },
      },
  });

    return res.status(200).json(notifs);
  } catch (e: any) {
    console.log(e);
    response(res, 401, e.message);
  }
}

export default withSessionApi(handler);
