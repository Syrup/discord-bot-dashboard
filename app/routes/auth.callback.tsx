import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import {
  APIUser,
  RESTGetAPICurrentUserGuildsResult,
  RESTPostOAuth2AccessTokenResult,
  // REST
} from "discord-api-types/v10";
import { request } from "undici";
import { getSession, commitSession } from "~/sessions";

export async function loader({ request: req }: LoaderFunctionArgs) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  // console.log(code);

  if (!code) {
    throw new Error("Authorization code not found");
  }

  const { body: tokenBody } = await request(
    "https://discord.com/api/oauth2/token",
    {
      method: "POST",
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.REDIRECT_URI!,
      }).toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const tokenResponse =
    (await tokenBody.json()) as RESTPostOAuth2AccessTokenResult;

  // console.log(tokenResponse);

  const { access_token } = tokenResponse;

  const { body: userBody } = await request(
    "https://discord.com/api/users/@me",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const user = (await userBody.json()) as APIUser;

  const { body: guildsBody } = await request("https://discord.com/api/users/@me/guilds", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const guilds = (await guildsBody.json()) as RESTGetAPICurrentUserGuildsResult;

  // Handle user login (e.g., create a session, store user info in the database, etc.)
  const session = await getSession(req.headers.get("Cookie"));

  session.set("user", user);
  session.set("token", tokenResponse);
  session.set("guilds", guilds)

  // console.log(session.data);

  // For simplicity, we'll just redirect to the home page with user info in the query string
  return redirect(`/`, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
