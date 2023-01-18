import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import cuid from "cuid";
import response from "@/lib/Http/Response";
import { findUser } from "@/lib/Auth/authentication";
import { withSessionApi } from "@/lib/Auth/authentication";
import CatchError from "@/lib/Error/catch";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { from, to } = req.body;

  try {
    const target = await prisma.users.findUnique({
      where: {
        username: to,
      },
      select: {
        id: true,
      },
    });

    const notif = await prisma.notifications.create({
      data: {
        message: `${from} added you to their friendlist`,
        read: false,
        userId: target?.id as string,
      },
    });

    
  } catch (e: any) {
    console.log(e);
    response(res, 401, e.message);
  }
}

export default withSessionApi(handler);
