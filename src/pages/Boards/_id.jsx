import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { createNewCardApi,deleteColumnDetailsApi, createNewColumnApi, fetchBoardDetailsApi,updateBoardDetailsApi, updateColumnDetailsApi, moveCardToDifferentColumnApi } from "~/apis";
import { generatePlaceholderCard } from "~/utils/formatters";
import { isEmpty } from "lodash";
import { mapOrder } from "~/utils/sorts";
import { CircularProgress, Typography } from "@mui/material";
import { toast } from "react-toastify";

function Board() {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const boardId = '680e4b7bf9fdf671fc6780ae'
    //call api
    fetchBoardDetailsApi(boardId).then((board) => {
      board.columns = mapOrder(board.columns, board.columnOrderIds, "_id")
      board.columns.forEach(column => {
        if(isEmpty(column.cards)){
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        }
        else{
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, "_id")
        }
      })
      setBoard(board)
    })
  },[])
  // gọi api và làm lại state board
  const createNewColumn = async (newColumnData) =>{
    const createdColumn = await createNewColumnApi({
      ...newColumnData,
      boardId: board._id
    })
        createdColumn.cards = [generatePlaceholderCard(createdColumn)]
        createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]
    // cập nhật state board
    const newBoard ={...board}
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }
  const createNewCard = async (newCardData) =>{
    const createdCard = await createNewCardApi({
      ...newCardData,
      boardId: board._id
    })

    // cập nhật state board
    const newBoard ={...board}
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      }
      else{
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }
    setBoard(newBoard)
  }
  const moveColumns = (dndOrderedColumns) => {
       const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
       const newBoard ={...board}
       newBoard.columns = dndOrderedColumns
       newBoard.columnOrderIds = dndOrderedColumnsIds
       setBoard(newBoard)
        // gọi api
       updateBoardDetailsApi(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })

  }

  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    const newBoard ={...board}
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
      
    }
    setBoard(newBoard)
    updateColumnDetailsApi(columnId, { cardOrderIds: dndOrderedCardIds })
  }
  // di chuyển card sang column khác: xóa khỏi mảng thứ tự cột ban đầu, thêm vào mảng thứ tự cột sau, cập nhật lại column
  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    const newBoard ={...board}
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)
    let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
    if(prevCardOrderIds[0].includes('placeholder-card')) {
       prevCardOrderIds = []
    }
     // gọi api
     moveCardToDifferentColumnApi({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
     })
  }

  const deleteColumnDetails = (columnId) => {
    const newBoard ={...board}
    newBoard.columns = newBoard.columns.filter(c => c._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== columnId)
    setBoard(newBoard)

    deleteColumnDetailsApi(columnId).then(res =>{
      toast.success(res?.deleteResult)
    }

    )
  }

  if(!board) {
    return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      justifyContent:'center',
      gap: 2,
      width: '100vw',
      height: '100vh'
      }}>
      <CircularProgress />
      <Typography>Loading Board...</Typography>
    </Box>
      )
  }
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: "100vh", backgroundColor: "primary.main" }}
    >
    
      <AppBar />
      <BoardBar board={board} />
      <BoardContent deleteColumnDetails={deleteColumnDetails} moveCardToDifferentColumn={moveCardToDifferentColumn} moveColumns={moveColumns} moveCardInTheSameColumn={moveCardInTheSameColumn} board={board} createNewCard={createNewCard} createNewColumn={createNewColumn} />
    </Container>
  );
}
export default Board;
