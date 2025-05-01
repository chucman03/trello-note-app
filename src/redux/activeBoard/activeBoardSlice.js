import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROOT } from "~/utils/constants";
import { mapOrder } from "~/utils/sorts";
import { isEmpty } from "lodash";
import { generatePlaceholderCard } from "~/utils/formatters";

// khởi tạo giá trị 1 state của 1 slice trong redux
const initialState = {
  currentActiveBoard: null,
};

//  các hành động gọi api và cập nhật dữ liệu vào reudx sẽ dùng middleware create async thunk đi kèm extraReducer
export const fetchBoardDetailsApi = createAsyncThunk(
  "activeBoard/fetchBoardDetailsApi",
  async (boardId) => {
    const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
    return response.data;
  }
);

//   khởi tạo 1 cái slice trong store của redux
export const activeBoardSlice = createSlice({
  name: "activeBoard",
  initialState,
  // Reducer là nơi xử lý dữ liệu đồng bộ
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      // action.payload là chuẩn đặt tên nhận dữ liệu vào reducer và gán vào biến có nghĩa hơn
      const board = action.payload;

      // xử lý dữ liệu nếu cần thiết
      //
      // update lại dữ liệu current active
      state.currentActiveBoard = board;
    },
  },
  //   extra reducer là nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsApi.fulfilled, (state, action) => {
      // action.payload ở đây là response.data trả về ở trên
      let board = action.payload;
      // xử lý dữ liệu nếu cần thiết
      //

      board.columns = mapOrder(board.columns, board.columnOrderIds, "_id");
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        } else {
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, "_id");
        }
      });
      // update lại dữ liệu current active
      state.currentActiveBoard = board;
    });
  },
});

// Action là nơi để các component gọi bằng dispatch tới nó để cập nhật lại dữ liệu thông qua reducer
//   action được tạo tự động bởi redux chỉ cần chấm tới nó để dùng
export const { updateCurrentActiveBoard } = activeBoardSlice.actions;

// selectors là nơi dành cho các component bên dưới gọi bằng hook useselector để lấy dữ liệu từ trong redux store ra
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard;
};

//file này tên là activeboardslice nhưng ta sẽ cần dùng reducer nên cần export reducer
export const activeBoardReducer = activeBoardSlice.reducer;
