import { Button, Chip, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockICon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { capitalizeFirstLetter } from "~/utils/formatters";
import BoardUserGroup from "./BoardUserGroup";
import InviteBoardUser from "./InviteBoardUser";

const MENU_STYLE = {
  color: "primary.main",
  bgcolor: "white",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  "& .MuiSvgIcon-root": {
    color: "primary.main",
  },
  "&:hover": {
    bgcolor: "primary.50",
  },
};

function BoardBar({board}) {
  return (
    <Box
      px={2}
      sx={{
        width: "100%",
        height: (theme) => theme.trelloCustom.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        overflowX: "auto",
        borderTop: "1px solid #00bfa5",
        backgroundColor: "white",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Tooltip title={board?.description}>
        <Chip
          sx={{
            MENU_STYLE,
          }}
          icon={<DashboardIcon />}
          label={board?.title}
          clickable
        />
        </Tooltip>
        <Chip
          sx={{
            MENU_STYLE,
          }}
          icon={<VpnLockICon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        />
        
        <Chip
          sx={{
            MENU_STYLE,
          }}
          icon={<AddToDriveIcon />}
          label={board?.title}
          clickable
        />
        <Chip
          sx={{
            MENU_STYLE,
          }}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={{
            MENU_STYLE,
          }}
          icon={<FilterListIcon />}
          label="Filters"
          clickable
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <InviteBoardUser boardId={board._id}/>
        {/* xử lý hiển thị danh sách thành viên */}
       <BoardUserGroup boardUsers={board?.FE_allUsers}/>
      </Box>
    </Box>
  );
}
export default BoardBar;
