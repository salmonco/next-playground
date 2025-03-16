import { isMock } from "~config/env";

export async function register() {
  // production server에서만 수집
  if (process.env.NEXT_RUNTIME === "nodejs") {
    if (isMock) {
      /**
       * msw
       */
      const { mockServerListen } = await import("./mock/server");

      mockServerListen();
    }
  }
}
