import { delay, HttpResponse } from "msw";
import { API_URL } from "~/data/apiUrl";
import { LetterListResponse } from "~/data/letter/getLetterList/type";
import { MockObject } from "~/mock/types";

type ResponseType = "1_0" | "2_0" | "3_0";

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
