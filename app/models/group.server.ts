import type { Group, Tag, User} from "@prisma/client";

import { prisma } from "~/db.server";

export function getAllGroups() {
  return prisma.group.findMany
}