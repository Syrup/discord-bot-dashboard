import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "~/sessions";
import type { SessionData } from "~types/index";
import { Button, Stats } from "react-daisyui";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  return session.data;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

function LoggedIn({ data }: { data: SessionData }) {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-2">
              <img
                src={`https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.png`}
                alt={`${data.user.username}'s avatar`}
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Hello {data.user.username}</h1>
        </div>

        <Stats className="lg:stats-horizontal shadow bg-grey-500">
          <Stats.Stat>
            <Stats.Stat.Title>Total Servers</Stats.Stat.Title>
            <Stats.Stat.Value>{data.guilds.length}</Stats.Stat.Value>
            <Stats.Stat.Desc>Number of servers you are in</Stats.Stat.Desc>
          </Stats.Stat>
          <Stats.Stat>
            <Stats.Stat.Title>Owned Servers</Stats.Stat.Title>
            <Stats.Stat.Value>
              {data.guilds.filter((g) => g.owner).length}
            </Stats.Stat.Value>
            <Stats.Stat.Desc>Number of servers you own</Stats.Stat.Desc>
          </Stats.Stat>
        </Stats>

        <div className="flex flex-wrap gap-2">
          <Button color="warning">Warning</Button>
          <Button>Default</Button>
          <Button color="neutral">Neutral</Button>
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="accent">Accent</Button>
          <Button color="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
    </div>
  );
}

function NotLoggedIn() {
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}

export default function Index() {
  const data = useLoaderData<SessionData>();

  // console.log(data);

  return data.user ? <LoggedIn data={data} /> : <NotLoggedIn />;
}
