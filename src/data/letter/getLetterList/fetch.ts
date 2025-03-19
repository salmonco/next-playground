import { customAxios } from "~api/axios/customAxios";
import { API_URL } from "~data/apiUrl";
import { LetterListResponse } from "~data/letter/getLetterList/type";

export const getLetterList = async () => {
  return await customAxios.get<LetterListResponse>(API_URL.LETTER.LETTER_LIST);
};
