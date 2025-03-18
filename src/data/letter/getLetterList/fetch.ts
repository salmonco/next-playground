import { customAxios } from "~api/axios/customAxios";
import { LetterListResponse } from "~data/letter/getLetterList/type";
import { API_URL } from "~mock/handlers/rest/volunteer/mockGetLetterList";

export const getLetterList = async () => {
  return await customAxios.get<LetterListResponse>(API_URL.LETTER.LETTER_LIST);
};
