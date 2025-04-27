import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { mockData } from "~/apis/mock-data";
import { fetchBoardDetailsApi } from "~/apis";

function Board() {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const boardId = '680e4b7bf9fdf671fc6780ae'
    //call api
    fetchBoardDetailsApi(boardId).then((board) => {
      setBoard(board)
    })
  },[])
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: "100vh", backgroundColor: "primary.main" }}
    >
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  );
}
export default Board;
