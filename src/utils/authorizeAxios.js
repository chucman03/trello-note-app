import axios from "axios";
import { toast } from "react-toastify";
import { interceptorLoadingElements } from "./formatters";
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

// Add a response interceptor
authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    interceptorLoadingElements(false);
    return response;
  },
  (error) => {
    interceptorLoadingElements(false);
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
