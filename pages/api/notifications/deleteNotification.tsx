import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import cuid from "cuid";
import response from "@/lib/Http/Response";
import { findUser } from "@/lib/Auth/authentication";
import { withSessionApi } from "@/lib/Auth/authentication";
import CatchError from "@/lib/Error/catch";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;

  console.log(id);
  try {
    if (id) {
      const deleteNotif = await prisma.notifications.delete({
        where: {
          id: id,
        },
      });

      return response(res, 200, "Successfully deleted notif");
    }
  } catch (e: any) {
    console.log(e.message);
    response(res, 401, e.message);
  }
}

export default withSessionApi(handler);
