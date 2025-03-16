import { delay, HttpResponse } from "msw";
import { MockObject } from "~mock/types";

type ResponseType = "1_0" | "2_0" | "3_0";

// TODO: api type 파일로 분리하기
export type LetterListResponse = {
  letterList: {
    letterKey: string;
    letterContent: string;
  }[];
};

// TODO: API_URL 파일로 분리하기
export const API_URL = {
  LETTER: {
    LETTER_LIST: "/api/letter/letterList",
  },
};

const response: Record<ResponseType, LetterListResponse> = {
  "1_0": {
    letterList: [],
  },
  "2_0": {
    letterList: [
      {
        letterKey: "mock-letter-key",
        letterContent: "123456",
      },
    ],
  },
  "3_0": {
    letterList: [
      {
        letterKey: "mock-letter-key",
        letterContent: "123456",
      },
      {
        letterKey: "mock-letter-key-1",
        letterContent: "234567",
      },
    ],
  },
};

export const mockGetLetterList: MockObject = {
  uri: API_URL.LETTER.LETTER_LIST,
  description: "봉사자 > 편지 > 편지 목록 조회",
  method: "get",
  requestHandler: async () => {
    await delay();

    return HttpResponse.json(response["3_0"], {
      status: 200,
    });
  },
};
