import {
  APIUser,
  RESTPostOAuth2AccessTokenResult,
  RESTGetAPICurrentUserGuildsResult,
} from "discord-api-types/v10";

export type SessionData = {
  user: APIUser;
  token: RESTPostOAuth2AccessTokenResult;
  guilds: RESTGetAPICurrentUserGuildsResult;
};

export type SessionFlashData = {
  error: string;
};

export interface Session {
  data: SessionData;
  flash: SessionFlashData;
}
