import Box from "@mui/material/Box";
import React from "react";
import Card from "./Card/Card";

function ListCard({ cards }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: "0 5px",
        m: "0 5px",
        gap: 1,
        overflowX: "hidden",
        overflowY: "auto",
        maxHeight: (theme) =>
          `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(
            5
          )} - ${theme.trelloCustom.columnHeaderHeight} - ${
            theme.trelloCustom.columnFooterHeight
          })`,
      }}
    >
      {/* <Card
        sx={{
          cursor: "pointer",
          boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
          overflow: "unset",
        }}
      >
        <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
          <Typography>Card 01</Typography>
        </CardContent>
      </Card> */}
      {cards?.map((card) => {
        return <Card key={card._id} card={card} />;
      })}
    </Box>
  );
}

export default ListCard;
