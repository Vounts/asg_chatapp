import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import cuid from "cuid";
import response from "@/lib/Http/Response";
import { findUser } from "@/lib/Auth/authentication";
import { withSessionApi } from "@/lib/Auth/authentication";
import CatchError from "@/lib/Error/catch";
async function handler(req: NextApiRequest, res: NextApiResponse) {

 
    const { username, frienduser } = req.body;
  console.log(username);
 try {
    if (username == frienduser) {
      response(res, 401, "You cannot add yourself");
      return;
    }
    if (username && frienduser) {
      const user = await findUser(username);
      const fuser = await findUser(frienduser);

      if (user && fuser) {
        const conversation = await prisma.conversations.create({
          data: {},
        });
        const usersconvo1 = await prisma.usersConversations.create({
          data: {
            userId: fuser.id,
            conversationId: conversation.id,
          },
        });
        const usersconvo2 = await prisma.usersConversations.create({
          data: {
            userId: user.id,
            conversationId: conversation.id,
          },
        });
        response(res, 200, "Successfully added to contact list");
      } else {
        response(res, 401, "User may not be registered in our system");
      }
    }
  } catch (e: any) {
    console.log(e);
    response(res, 401, e.message);
  }
}

export default withSessionApi(handler);
