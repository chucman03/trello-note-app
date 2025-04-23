import Box from "@mui/material/Box";
import React from "react";
import Column from "./Column/Column";
import { Button } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

function ListColumns({ columns }) {
  return (
    <SortableContext
      items={columns?.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: "inherit",
          width: "100%",
          height: "100%",
          overflowX: "auto",
          overflowY: "hidden",
          display: "flex",
        }}
      >
        {" "}
        {/* collumn */}
        {columns?.map((column) => {
          return <Column key={column._id} column={column} />;
        })}
        <Box
          sx={{
            minWidth: "200px",
            maxWidth: "200px",
            mx: 2,
            borderRadius: "6px",
            height: "fit-content",
            bgcolor: "#ffffff3d",
            width: "100%",
            justifyContent: "flex-start",
            pl: 2.5,
            py: 1,
          }}
        >
          <Button sx={{ color: "white" }} startIcon={<NoteAddIcon />}>
            Add New Column
          </Button>
        </Box>
      </Box>
    </SortableContext>
  );
}
export default ListColumns;
