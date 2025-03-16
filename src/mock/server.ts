import { setupServer } from "msw/node";

import handlers from "./handlers/rest";

export const mockServerListen = () => {
  const mockServer = setupServer(...handlers);

  mockServer.listen({
    /**
     * handler 에 포함되지 않은 요청에 대한 처리
     * @see https://mswjs.io/docs/api/setup-worker/start/#onunhandledrequest
     */
    onUnhandledRequest(req, print) {
      if (req.url === "http://localhost:4318/v1/traces") {
        return;
      }

      // 그 외는 print warning
      print.warning();
    },
  });

  // logging
  mockServer.events.on("request:match", ({ request }) => {
    console.log(
      "\n[ MSW intercepted ]\n",
      request.method,
      request.url,
      `\n(cache: ${request.cache})\n`
    );
  });
};
