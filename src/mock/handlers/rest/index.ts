import { http, type HttpHandler } from "msw";

import handlers from "./handler";

/**
 * server 와 browser 에서 모두 사용되는 하나의 hanlder list
 */
export default handlers.reduce((acc, handler) => {
  // handler 추가
  acc.push(http[handler.method](handler.uri, handler.requestHandler));

  return acc;
}, [] as Array<HttpHandler>);
