import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import response from "@/lib/Http/Response";
import { findUser } from "@/lib/Auth/authentication";
import { withSessionApi } from "@/lib/Auth/authentication";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { conversationId } = req.body;
  try {
    if (conversationId) {
      const deleteContact = await prisma.conversations.delete({
        where: {
          id: conversationId,
        },
      });

      return response(res, 200, "Successfully deleted");
    }
  } catch (e: any) {
    console.log(e);
    return response(res, 401, e.message);
  }
}

export default withSessionApi(handler);
