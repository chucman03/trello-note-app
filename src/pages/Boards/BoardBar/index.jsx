import { Button, Chip, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockICon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

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

function BoardBar() {
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
        <Chip
          sx={{
            MENU_STYLE,
          }}
          icon={<DashboardIcon />}
          label="App fullstack"
          clickable
        />
        <Chip
          sx={{
            MENU_STYLE,
          }}
          icon={<VpnLockICon />}
          label="Public/Private workspace"
          clickable
        />
        <Chip
          sx={{
            MENU_STYLE,
          }}
          icon={<AddToDriveIcon />}
          label="Add to Google drive"
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
        <Button variant="outlined" startIcon={<PersonAddIcon />}>
          Invite
        </Button>
        <AvatarGroup
          max={4}
          sx={{
            "& .MuiAvatar-root": {
              width: 34,
              height: 34,
              fontSize: 16,
            },
          }}
        >
          <Tooltip title="avatar">
            <Avatar alt="avatar" src="/static/images/avatar/1.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
}
export default BoardBar;
