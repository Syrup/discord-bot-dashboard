import { createSessionStorage, createCookie, Cookie } from "@remix-run/node"; // or cloudflare/deno
import { client } from "./routes/.server/redis";
import crypto from "crypto";
import type { SessionData, SessionFlashData } from "~types/index";

function createDatabaseSessionStorage({ cookie }: { cookie: Cookie }) {
  return createSessionStorage<SessionData, SessionFlashData>({
    cookie,
    async createData(data, expires) {
      const randomBytes = crypto.randomBytes(8);
      const id = randomBytes.toString("hex");
      await client.hSet(`session:${id}`, { data: JSON.stringify(data) });
      if (expires) {
        await client.expireAt(`session:${id}`, expires.getTime());
      }
      return id;
    },
    async readData(id) {
      // console.log(await client.hGetAll(`session:${id}`), id);
      const rawData = (await client.hGetAll(`session:${id}`)) ?? null;
      const data = rawData ? JSON.parse(rawData.data) : null;
      return data;
    },
    async updateData(id, data, expires) {
      await client.hSet(`session:${id}`, { data: JSON.stringify(data) });
      if (expires) {
        await client.expireAt(`session:${id}`, expires.getTime());
      }
    },
    async deleteData(id) {
      await client.del(`session:${id}`);
    },
  });
}

export const { getSession, commitSession, destroySession } =
  createDatabaseSessionStorage({
    cookie: createCookie("__session", {
      secrets: [process.env.SESSION_SECRET!],
      sameSite: true,
    }),
  });
