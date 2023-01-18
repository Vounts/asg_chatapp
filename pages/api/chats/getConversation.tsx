import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import response from "@/lib/Http/Response";
import { findUser } from "@/lib/Auth/authentication";
import { withSessionApi } from "@/lib/Auth/authentication";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { targetId } = req.body;

  try {
    if (targetId) {
      const conversation = await prisma.conversations.findUnique({
        where: {
          id: targetId,
        },
        include: {
          usersConversations: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
          messages: true,
        },
      });

      
      return res.status(200).json(conversation);
    }
  } catch (e: any) {
    console.log(e);
    return res.status(401).json({ message: e.message });
  }
}

export default withSessionApi(handler);
