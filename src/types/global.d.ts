import { User } from "@prisma/client";

/* eslint-disable no-var */
declare global {
  var __userCache: Map<string, User> | undefined;
}
/* eslint-enable no-var */
