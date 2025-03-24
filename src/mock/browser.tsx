"use client";

import { useEffect, useRef } from "react";

import { bypass } from "msw";
import { customAxios } from "~/api/axios/customAxios";
import { isMock } from "~/config/env";

const ON_MSW_ENABLED = "on-msw-enabled";

let isMockEnabled = false;

/**
 * 브라우저에서 Mock Server 활성화 로직을 담은 컴포넌트
 */
export const EnableMock = () => {
  const isEffectCalled = useRef(false);

  useEffect(() => {
    if (isEffectCalled.current) {
      return;
    }

    isEffectCalled.current = true;

    if (isMock && typeof window !== "undefined") {
      (async () => {
        // msw init 시점의 race condition 을 방지하기 위한 interceptor 추가
        customAxios.interceptors.request.use((config) => {
          if (isMockEnabled) {
            return config;
          }

          // mock enabled 되기 전에 axios 요청이 오면, promise 반환
          return new Promise((resolve) => {
            window.addEventListener(ON_MSW_ENABLED, () => resolve(config), {
              once: true,
            });
          });
        });

        // tree shaking 가능하도록 dynamic import
        const importMswBrowser = () => import("msw/browser");
        const importHandlers = () => import("./handlers/rest");

        const [{ setupWorker }, { default: handlers }] = await Promise.all([
          importMswBrowser(),
          importHandlers(),
        ]);

        const worker = setupWorker(...handlers);

        worker
          .start({
            /**
             * handler 에 포함되지 않은 요청에 대한 처리
             * @see https://mswjs.io/docs/api/setup-worker/start/#onunhandledrequest
             */
            onUnhandledRequest(request, print) {
              if (
                request.url.includes("chrome-extension://") ||
                request.url.startsWith("http://localhost:8080")
              ) {
                bypass(request.url);

                return;
              }

              // 그 외는 print warning
              print.warning();
            },
          })
          .then(() => {
            isMockEnabled = true;
            window.dispatchEvent(new CustomEvent(ON_MSW_ENABLED));
          });
      })();
    }
  }, []);

  return null;
};
