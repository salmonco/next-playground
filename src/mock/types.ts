import { type http, type HttpResponseResolver } from "msw";

export type HttpMethod = keyof typeof http;

export type MockObject = {
  uri: string;
  description: string;
  method: HttpMethod;
  requestHandler: HttpResponseResolver;
};
