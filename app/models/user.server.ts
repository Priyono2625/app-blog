import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserForSuperadmin() {
  return prisma.user.findMany({
    include: {
      group: {
        select: {title: true}
      }
    }
  });
}

export async function getUserById(id: User["id"]) {
  // return prisma.user.findUnique({ where: { id } });
  return prisma.user.findUnique({
    where: { id },
    include: {
      group: {
        select: {title: true}
      }
    }
  });
}

export async function getUserByEmail(email: User["email"]) {
  // return prisma.user.findUnique({ where: { email } });
  return prisma.user.findUnique({
    where: { email },
    include: {
      group: {
        select: {title: true}
      }
    }
  });
}

export async function getUserByUsername(username: User["username"]) {
  // return prisma.user.findUnique({ where: { email } });
  return prisma.user.findUnique({
    where: { username },
    include: {
      group: {
        select: {title: true}
      }
    }
  });
}

export async function createUser({
  email,
  username,
  name,
  password
}: { email: User["email"], username: User["username"], name: User["name"], password: string }) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      username,
      name,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  username: User["username"],
  password: Password["hash"],
) {
  const userWithPassword = await prisma.user.findFirst({
    where: {OR: [{username},{email}]},
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash,
  );

  if (!isValid) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
