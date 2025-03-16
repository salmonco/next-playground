import { customAxios } from "@component/common/apis/axios/customAxios";
import {
  API_URL,
  LetterListResponse,
} from "@component/mock/handlers/rest/volunteer/mockGetLetterList";

export const getLetterList = async () => {
  return await customAxios.get<LetterListResponse>(API_URL.LETTER.LETTER_LIST);
};
