import crypto from "crypto";
import { isNull } from "../NullChecker/Null";
import { ironOptions } from "./config/ironConfig";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { equal } from "assert";
import prisma from "../prisma";
export function validatePassword(user: any, inputPassword: any) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = user.password === inputHash;
  return passwordsMatch;
}

export async function findUser(id: string) {
  const user = await prisma.users.findUnique({
    where: {
      username: id,
    },
  });
  console.log(user);
  return user;
}

export function withSession(handler: any) {
  return withIronSessionSsr(handler, ironOptions);
}
export function withSessionApi(handler: any) {
  return withIronSessionApiRoute(handler, ironOptions);
}

export const validateSession = async ({ req, res }: any) => {
  const session = req?.session?.user;
  if (isNull({ session })) {
    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export const validateLoggedSession = async ({ req, res }: any) => {
  const session = req?.session?.user;
  if (isNull({ session })) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        user: req.session.user,
      },
    };
  }
};
