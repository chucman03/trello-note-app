import axios from "axios";
import { toast } from "react-toastify";
import { interceptorLoadingElements } from "./formatters";
import { useDispatch } from "react-redux";
import { logoutUserAPI } from "~/redux/user/userSlice";
import { refreshTokenApi } from "~/apis";

let axiosReduxStore
export const injectStore = mainStore => {
  axiosReduxStore = mainStore
}
//khởi tạo 1 đối tượng axios để custom và dùng chung cho dự án
const authorizeAxiosInstance = axios.create();
// cấu hình thời gian tối đa 10p
authorizeAxiosInstance.defaults.timeout = 100 * 60 * 10;
// with credential: cho phép axios tự động gửi cookie trong mỗi request lên BE(lưu tokent jwt vào cookie của trình duyệt )
authorizeAxiosInstance.defaults.withCredentials = true;

// interceptors
// Add a request interceptor
authorizeAxiosInstance.interceptors.request.use(
  (config) => {
    // kĩ thuật chặn spam click
    interceptorLoadingElements(true);
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

let refreshTokenPromise = null

// Add a response interceptor
authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    interceptorLoadingElements(false);
    return response;
  },
  (error) => {
    interceptorLoadingElements(false);

    // neu nhan ma 401 tu backend thi goi api dang xuat
    if (error.response?.status === 401) {
      axiosReduxStore.dispatch(logoutUserAPI(false))
    }
    // neu nhan ma 410 tu backend thi refresh token
    // dau tien lay cac request api dang bi loi tu error.config
    const originalRequests = error.config
    // 
    if (error.response?.status === 410 && !originalRequests._retry) {
      axiosReduxStore.dispatch(logoutUserAPI(false))
      originalRequests._retry = true
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenApi()
        .then(data => {
          return data?.accessToken
        })
        .catch((_error) => {
          axiosReduxStore.dispatch(logoutUserAPI(false))
          return Promise.reject(_error)
        })
        .finally(() => {
          refreshTokenPromise = null
        })
      }
      return refreshTokenPromise.then(accessToken => {
        return authorizeAxiosInstance(originalRequests)
      })
    }
    // hiển thị lỗi backend trả về ở đây
    let errorMessage = error?.message;
    if (error.response?.data.message) {
      errorMessage = error.response?.data.message;
    }
    //Dùng toastify hiển thị mọi mã lỗi lên màn hình trừ mã 410 phục vụ refresh token
    if (error.response?.status !== 410) {
      toast.error(errorMessage);
    }
    return Promise.reject(error);
  }
);

export default authorizeAxiosInstance;
