import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import response from "@/lib/Http/Response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body;

  if (username && password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");

    const user = await prisma.users.create({
      data: {
        username: username,
        password: hash,
        salt: salt,
      },
    });

    console.log(user);

    if (user) {
      response(res, 200, "Succesfully registered user");
    } else {
      response(res, 401, "Failed to register user");
    }
  }
}
