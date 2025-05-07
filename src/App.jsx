import Board from "~/pages/Boards/_id";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import NotFound from "./pages/404/NotFound";
import Auth from "./pages/Auth/Auth";
import AccountVerification from "./pages/Auth/AccountVerification";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./redux/user/userSlice";
import Settings from "./pages/Settings/Settings";
import Boards from "./pages/Boards";

const ProtectedRoute = ({user}) => {
  if (!user) return <Navigate to='/login' replace={true}/>
  return <Outlet/>
}

function App() {
  const currentUser = useSelector(selectCurrentUser)
  return (
    <Routes>
      {/* react router dom */}
      <Route
        path="/"
        element={
          <Navigate to="/boards/680e4b7bf9fdf671fc6780ae" replace={true} />
        }
      />
      <Route element={<ProtectedRoute user={currentUser}/>}>
        <Route path="/boards/:boardId" element={<Board />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/settings/account" element={<Settings />} />
        <Route path="/settings/security" element={<Settings />} />

      </Route>
      
      {/* authentication */}
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/account/verification" element={<AccountVerification />} />

      {/* 404 not found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
