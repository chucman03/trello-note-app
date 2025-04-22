import Box from "@mui/material/Box";
import React from "react";
import Column from "./Column/Column";
import { Button } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

function ListColumns() {
  return (
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
      <Column />
      <Column />
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
  );
}
export default ListColumns;
