import {
  Box,
  Button,
  TextField,
  Typography,
  Badge,
  Tooltip,
} from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
// import trelloLgo from "~/assets/trello.svg";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as TrelloIcon } from "~/assets/trello.svg";
import WorkSpace from "./Menus/Workspaces";
import Recent from "./Menus/Recent";
import Starred from "./Menus/Starred";
import Templates from "./Menus/Templates";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Profiles from "./Menus/Profiles";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { useState } from "react";
import { Link } from "react-router-dom";

function AppBar() {
  const [searchValue, setSearchValue] = useState("")
  return (
    <Box
      px={2}
      sx={{
        width: "100%",
        backgroundColor: "white",
        height: (theme) => theme.trelloCustom.appBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        overflowX: "auto",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Link to="/boards">
      <Tooltip title="Board list">
        <AppsIcon sx={{ color: "primary.main", verticalAlign: "middle" }} />
      </Tooltip>
      </Link>
        <Link to="/">
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <SvgIcon
              component={TrelloIcon}
              inheritViewBox
              sx={{ color: "primary.main" }}
              fontSize="small"
            />
            <Typography
              variant="span"
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "primary.main",
              }}
            >
              Trello
            </Typography>
          </Box>
        </Link>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          <WorkSpace />
          <Recent />
          <Starred />
          <Templates />

          <Button variant="outlined" startIcon={<LibraryAddIcon />}>
            Create
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          border: "primary.main",
        }}
      >
        <TextField
          id="outlined-search"
          label="Search"
          type="search"
          size="small"
          value={searchValue}
          onChange={(e) =>setSearchValue(e.target.value)}
          sx={{ minWidth: "120px" }}
        />
        <Tooltip title="Notification">
          <Badge color="secondary" variant="dot" sx={{ cursor: "pointer" }}>
            <NotificationsNoneIcon sx={{ color: "primary.main" }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: "pointer", color: "primary.main" }} />
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  );
}

export default AppBar;
