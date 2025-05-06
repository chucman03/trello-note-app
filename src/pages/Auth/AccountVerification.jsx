import React, { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { verifyUserApi } from "~/apis";
import PageLoadingSpinner from "~/components/Loading/PageLoadingSpinner";

function AccountVerification() {
    // lấy email và token từ url
    let [searchParams] = useSearchParams()
    const email = searchParams.get('email')
    const token = searchParams.get('token')
    // tạo state lưu thông tin đã xác thực chưa
    const [verified, setVerified] = useState(false)
    // gọi api verify tài khoản
    useEffect(() => {
        if(email && token){
            verifyUserApi({email, token}).then(() => setVerified(true))
        }
    },[email, token])

    // nếu url có vấn đề thì đá sang 404
    if(!email || token) {
        return <Navigate to="/404"/>
    }
    // nếu chưa verify xong thì hiện loading
    if(!verified) {
        return <PageLoadingSpinner caption="verifying your account"/>
    }
    return(
        <Navigate to={`/login?verifiedEmail=${email}`}/>
    )
}
export default AccountVerification