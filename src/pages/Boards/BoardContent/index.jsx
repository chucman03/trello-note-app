import Box from "@mui/material/Box";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Cloud from "@mui/icons-material/Cloud";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCardItem from "@mui/icons-material/AddCard";
import DragHandleICon from "@mui/icons-material/DragHandle";
import { ContentCopy, ContentPaste } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupIcon from "@mui/icons-material/Group";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import AttachmentIcon from "@mui/icons-material/Attachment";

const COLLUMN_HEADER_HEIGHT = "50px";
const COLLUMN_FOOTER_HEIGHT = "50px";

function BoardContent() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
      <Box
        sx={{
          bgcolor: "inherit",
          width: "100%",
          height: "100%",
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        {" "}
        {/* collumn */}
        <Box
          sx={{
            minWidth: "300px",
            maxWidth: "300px",
            backgroundColor: "#ebecf0",
            ml: 2,
            borderRadius: "6px",
            height: "fit-content",
            maxHeight: (theme) =>
              `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(
                5
              )})`,
          }}
        >
          {/* box column header */}
          <Box
            sx={{
              height: COLLUMN_HEADER_HEIGHT,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: "1rem", fontWeight: "bold", cursor: "pointer" }}
            >
              Collumn Title
            </Typography>
            <Box>
              <Tooltip title="more options">
                <ExpandMoreIcon
                  sx={{ color: "text.primary", cursor: "pointer" }}
                  id="basic-collumn-dropdown"
                  aria-controls={open ? "basic-menu-collumn" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                />
              </Tooltip>
              <Menu
                id="basic-menu-collumn"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-collumn-dropdown",
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardItem fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add New Card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <DeleteForeverIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Archieve this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/* box column list card */}
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
                `calc(${
                  theme.trelloCustom.boardContentHeight
                } - ${theme.spacing(
                  5
                )} - ${COLLUMN_HEADER_HEIGHT} - ${COLLUMN_FOOTER_HEIGHT})`,
            }}
          >
            <Card
              sx={{
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                overflow: "unset",
              }}
            >
              <CardMedia
                sx={{ height: 140 }}
                image="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
                title="green iguana"
              />
              <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                <Typography>MernStack</Typography>
              </CardContent>
              <CardActions sx={{ p: "0 4px 8px 4px" }}>
                <Button size="small" startIcon={<GroupIcon />}>
                  20
                </Button>
                <Button size="small" startIcon={<ModeCommentIcon />}>
                  15
                </Button>{" "}
                <Button size="small" startIcon={<AttachmentIcon />}>
                  10
                </Button>
              </CardActions>
            </Card>
            <Card
              sx={{
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                overflow: "unset",
              }}
            >
              <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
          </Box>
          {/* box column footer */}
          <Box
            sx={{
              height: COLLUMN_FOOTER_HEIGHT,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button endIcon={<AddCardItem />}>Add New Card</Button>
            <Tooltip title="Drag to move">
              <DragHandleICon sx={{ cursor: "pointer" }} />
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default BoardContent;
