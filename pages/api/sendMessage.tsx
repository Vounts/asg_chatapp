import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import cuid from "cuid";
import response from "@/lib/Http/Response";
import { findUser } from "@/lib/Auth/authentication";
import { withSessionApi } from "@/lib/Auth/authentication";
import CatchError from "@/lib/Error/catch";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message, convoId } = req.body;
  const user = req.session.user;

  try {
    if (convoId && message && user) {
      const msg = await prisma.messages.create({
        data: {
          conversationId: convoId,
          userId: user?.id,
          message: message,
          sent: true, 
        },
      });

      return res.status(200).json(msg);
    }
  } catch (e) {
    console.log(e);
  }
}

export default withSessionApi(handler);
