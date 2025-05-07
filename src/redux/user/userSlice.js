import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authorizeAxiosInstance from "~/utils/authorizeAxios";
import { API_ROOT } from "~/utils/constants";

// khởi tạo giá trị 1 state của 1 slice trong redux
const initialState = {
  currentUser: null,
};

//  các hành động gọi api và cập nhật dữ liệu vào reudx sẽ dùng middleware create async thunk đi kèm extraReducer
export const loginUserApi = createAsyncThunk(
  "user/loginUserApi",
  async (data) => {
    const response = await authorizeAxiosInstance.post(
      `${API_ROOT}/v1/users/login`, data
    );
    return response.data;
  }
);

export const updateUserApi = createAsyncThunk(
  "user/updateUserApi",
  async (data) => {
    const response = await authorizeAxiosInstance.put(
      `${API_ROOT}/v1/users/update`, data
    );
    return response.data;
  }
);

export const logoutUserAPI = createAsyncThunk(
    'user/logoutUserAPI',
    async (showSuccessMessage = true) => {
        const response = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/users/logout`)
        if (showSuccessMessage){
            toast.success('Logged out successfully')
        }
        return response.data
    }
)

//   khởi tạo 1 cái slice trong store của redux
export const userSlice = createSlice({
  name: "user",
  initialState,
  // Reducer là nơi xử lý dữ liệu đồng bộ
  reducers: {},
  //   extra reducer là nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginUserApi.fulfilled, (state, action) => {
      // action.payload ở đây là response.data trả về ở trên
      const user = action.payload;
      state.currentUser = user;
    });

    builder.addCase(logoutUserAPI.fulfilled, (state) => {
        // action.payload ở đây là response.data trả về ở trên
        state.currentUser = null;
      });

    builder.addCase(updateUserApi.fulfilled, (state, action) => {
        // action.payload ở đây là response.data trả về ở trên
        const user = action.payload
        state.currentUser = user;
      });
  },
});

// Action là nơi để các component gọi bằng dispatch tới nó để cập nhật lại dữ liệu thông qua reducer
//   action được tạo tự động bởi redux chỉ cần chấm tới nó để dùng
export const {} = userSlice.actions;

// selectors là nơi dành cho các component bên dưới gọi bằng hook useselector để lấy dữ liệu từ trong redux store ra
export const selectCurrentUser = (state) => {
  return state.user.currentUser
};

export const userReducer = userSlice.reducer;
