import { customAxios } from "~api/axios/customAxios";
import {
  API_URL,
  LetterListResponse,
} from "~mock/handlers/rest/volunteer/mockGetLetterList";

export const getLetterList = async () => {
  return await customAxios.get<LetterListResponse>(API_URL.LETTER.LETTER_LIST);
};
