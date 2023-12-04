import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Container,
  Drawer,
  Divider,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import BoardList from "./boardList";

const Sidebar = (props) => {
  const { boards, user, width, handleDrawerClose, open } = props;

  const toggleDrawer = (open) => {
    // setOpen(open);
    return;
  };

  return (
    <Drawer
      anchor="left"
      variant="persistent"
      open={open}
      width={width}
      // itemSize={46}
      // itemCount={200}
      // overscanCount={5}
    >
      <Box
        sx={{ display: "flex", alignItems: "end", justify: "end" }}
        handleDrawerClose={handleDrawerClose}
      >
        <Button
          sx={{
            width: "100%",
            display: "flex",
            px: 2,
            "justify-content": "end",
            "align-items": "right",
          }}
          onClick={handleDrawerClose}
        >
          <ArrowBackIosIcon sx={{ ml: 2 }} />
        </Button>
      </Box>
      <Divider />
      <Typography margin={2} variant="h5">
        Boards
      </Typography>
      <BoardList boards={boards} handleDrawerClose={handleDrawerClose} />
    </Drawer>
  );
};

export default Sidebar;
