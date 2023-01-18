import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import cuid from "cuid";
import response from "@/lib/Http/Response";
import { findUser } from "@/lib/Auth/authentication";
import { withSessionApi } from "@/lib/Auth/authentication";
import CatchError from "@/lib/Error/catch";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = req.session.user;
    const contacts = await prisma.usersConversations.findMany({
      where: {
        userId: {
          equals: user?.id,
        },
      },
    });

   

    const convos = await Promise.all(
      contacts.map(async (element) => {
        return await prisma.conversations.findUnique({
          where: {
            id: element?.conversationId,
          },
          include: {
            usersConversations: {
              include: {
                user: {
                  select: {
                    username: true,
                  },
                },
              },
            },
          },
        });
      })
    );

    console.log(typeof convos);
    return res.status(200).json(convos);
  } catch (e: any) {
    console.log(e);
    response(res, 401, e.message);
  }
}

export default withSessionApi(handler);
