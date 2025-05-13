import { createSlice } from "@reduxjs/toolkit";


// khởi tạo giá trị 1 state của 1 slice trong redux
const initialState = {
  currentActiveCard: null,
  isShowModalActiveCard: false
};
//   khởi tạo 1 cái slice trong store của redux
export const activeCardSlice = createSlice({
  name: "activeCard",
  initialState,
  // Reducer là nơi xử lý dữ liệu đồng bộ
  reducers: {
    showModalActiveCard: (state) => {
      state.isShowModalActiveCard = true
    },

    clearAndHideCurrentActiveCard: (state) => {
      // action.payload là chuẩn đặt tên nhận dữ liệu vào reducer và gán vào biến có nghĩa hơn
      state.currentActiveCard = null
      state.isShowModalActiveCard = false
    },
    updateCurrentActiveCard: (state, action) => {
      const fullCard = action.payload
      state.currentActiveCard = fullCard
    },
  },
  //   extra reducer là nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
  },
});

// Action là nơi để các component gọi bằng dispatch tới nó để cập nhật lại dữ liệu thông qua reducer
//   action được tạo tự động bởi redux chỉ cần chấm tới nó để dùng
export const {clearAndHideCurrentActiveCard, updateCurrentActiveCard, showModalActiveCard } = activeCardSlice.actions;

// selectors là nơi dành cho các component bên dưới gọi bằng hook useselector để lấy dữ liệu từ trong redux store ra
export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard;
};
export const selectIsShowModalActiveCard = (state) => {
  return state.activeCard.isShowModalActiveCard;
};

//file này tên là activeboardslice nhưng ta sẽ cần dùng reducer nên cần export reducer
export const activeCardReducer = activeCardSlice.reducer;
