import Box from "@mui/material/Box";
import React from "react";
import ListColumns from "./ListColumns/ListColumns";

function BoardContent() {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        width: "100%",
        display: "flex",
        height: (theme) => theme.trelloCustom.boardContentHeight,
        p: "10px 0",
      }}
    >
      <ListColumns />
    </Box>
  );
}
export default BoardContent;
