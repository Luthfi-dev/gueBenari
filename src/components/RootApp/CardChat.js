import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

export default function CardChat() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 30,
        right: 10,
        zIndex: 1000,
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        icon={
          <SpeedDialIcon
            className="bg-app"
            style={{ padding: "15px", borderRadius: "50px" }}
          />
        }
        sx={{
          "& .MuiSpeedDial-button": {
            backgroundColor: "yellow",
          },
        }}
        className="MuiFab-warning"
      >
        {actions.map((action) => (
          <SpeedDialAction
            className="bg-app"
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
