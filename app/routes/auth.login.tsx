import { redirect } from "@remix-run/node";

export function loader() {
  const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  const REDIRECT_URI = process.env.REDIRECT_URI;

  const url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=identify+email+guilds`;

  return redirect(url);
}
