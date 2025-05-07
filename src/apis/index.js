import { toast } from "react-toastify";
import authorizeAxiosInstance from "~/utils/authorizeAxios";
import { API_ROOT } from "~/utils/constants";

// board
// di chuyển đến redux
// export const fetchBoardDetailsApi = async (boardId) => {
//     const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
//     return response.data
// }
//
export const updateBoardDetailsApi = async (boardId, updateData) => {
  const response = await authorizeAxiosInstance.put(
    `${API_ROOT}/v1/boards/${boardId}`,
    updateData
  );
  return response.data;
};

export const moveCardToDifferentColumnApi = async (updateData) => {
  const response = await authorizeAxiosInstance.put(
    `${API_ROOT}/v1/boards/supports/moving_card`,
    updateData
  );
  return response.data;
};

// column
export const createNewColumnApi = async (newColumnData) => {
  const response = await authorizeAxiosInstance.post(
    `${API_ROOT}/v1/columns`,
    newColumnData
  );
  return response.data;
};
export const updateColumnDetailsApi = async (columnId, updateData) => {
  const response = await authorizeAxiosInstance.put(
    `${API_ROOT}/v1/columns/${columnId}`,
    updateData
  );
  return response.data;
};
export const deleteColumnDetailsApi = async (columnId) => {
  const response = await authorizeAxiosInstance.delete(
    `${API_ROOT}/v1/columns/${columnId}`
  );
  return response.data;
};

// card
export const createNewCardApi = async (newCardData) => {
  const response = await authorizeAxiosInstance.post(
    `${API_ROOT}/v1/cards`,
    newCardData
  );
  return response.data;
};

// users
export const registerUserApi = async (data) => {
  const response = await authorizeAxiosInstance.post(
    `${API_ROOT}/v1/users/register`,
    data
  );
  toast.success('Account created successfully', {theme:'colored'})
  return response.data;
};
export const verifyUserApi = async (data) => {
  const response = await authorizeAxiosInstance.put(
    `${API_ROOT}/v1/users/verify`,
    data
  );
  toast.success('Account verified successfully', {theme:'colored'})
  return response.data;
};

export const refreshTokenApi = async () => {
  const response = await authorizeAxiosInstance.get(
    `${API_ROOT}/v1/users/refresh_token`
  );
  return response.data;
};