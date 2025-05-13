import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import {
  updateBoardDetailsApi,
  updateColumnDetailsApi,
  moveCardToDifferentColumnApi,
} from "~/apis";
import { cloneDeep, isEmpty } from "lodash";
// import { mapOrder } from "~/utils/sorts";
import { CircularProgress, Typography } from "@mui/material";
import {
  fetchBoardDetailsApi,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard,
} from "~/redux/activeBoard/activeBoardSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PageLoadingSpinner from "~/components/Loading/PageLoadingSpinner";
import ActiveCard from "~/components/Modal/ActiveCard/ActiveCard";
import { selectCurrentActiveCard } from "~/redux/activeCard/activeCardSlice";

function Board() {
  const dispatch = useDispatch();
  // const [board, setBoard] = useState(null);
  const board = useSelector(selectCurrentActiveBoard);
  const activeCard = useSelector(selectCurrentActiveCard)
  const { boardId } = useParams();
  useEffect(() => {
    // const boardId = "680e4b7bf9fdf671fc6780ae";
    //call api
    dispatch(fetchBoardDetailsApi(boardId));
    // fetchBoardDetailsApi(boardId).then((board) => {
    //   board.columns = mapOrder(board.columns, board.columnOrderIds, "_id");
    //   board.columns.forEach((column) => {
    //     if (isEmpty(column.cards)) {
    //       column.cards = [generatePlaceholderCard(column)];
    //       column.cardOrderIds = [generatePlaceholderCard(column)._id];
    //     } else {
    //       column.cards = mapOrder(column?.cards, column?.cardOrderIds, "_id");
    //     }
    //   });
    //   setBoard(board);
    // });
  }, [dispatch, boardId]);

  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    // setBoard(newBoard);
    dispatch(updateCurrentActiveBoard(newBoard));
    // gọi api
    updateBoardDetailsApi(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds,
    });
  };

  const moveCardInTheSameColumn = (
    dndOrderedCards,
    dndOrderedCardIds,
    columnId
  ) => {
    // const newBoard = { ...board };
    const newBoard = cloneDeep(board);
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === columnId
    );
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards;
      columnToUpdate.cardOrderIds = dndOrderedCardIds;
    }
    // setBoard(newBoard);
    dispatch(updateCurrentActiveBoard(newBoard));
    updateColumnDetailsApi(columnId, { cardOrderIds: dndOrderedCardIds });
  };
  // di chuyển card sang column khác: xóa khỏi mảng thứ tự cột ban đầu, thêm vào mảng thứ tự cột sau, cập nhật lại column
  const moveCardToDifferentColumn = (
    currentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumns
  ) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    // setBoard(newBoard);
    dispatch(updateCurrentActiveBoard(newBoard));
    let prevCardOrderIds = dndOrderedColumns.find(
      (c) => c._id === prevColumnId
    )?.cardOrderIds;
    if (prevCardOrderIds[0].includes("placeholder-card")) {
      prevCardOrderIds = [];
    }
    // gọi api
    moveCardToDifferentColumnApi({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find((c) => c._id === nextColumnId)
        ?.cardOrderIds,
    });
  };

  if (!board) {
    return (
      <PageLoadingSpinner caption="Loading Board wait 5 to 10 minutes"/>
    );
  }
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: "100vh", backgroundColor: "primary.main" }}
    >
      <ActiveCard />
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        // deleteColumnDetails={deleteColumnDetails}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        board={board}
        // createNewCard={createNewCard}
        // createNewColumn={createNewColumn}
      />
    </Container>
  );
}
export default Board;
