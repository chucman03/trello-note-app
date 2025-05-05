import Board from "~/pages/Boards/_id";
import { Route, Routes, Navigate } from "react-router-dom";
import NotFound from "./pages/404/NotFound";
import Auth from "./pages/Auth/Auth";

function App() {
  return (
    <Routes>
      {/* react router dom */}
      <Route
        path="/"
        element={
          <Navigate to="/boards/680e4b7bf9fdf671fc6780ae" replace={true} />
        }
      />
      <Route path="/boards/:boardId" element={<Board />} />
      {/* authentication */}
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      {/* 404 not found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
