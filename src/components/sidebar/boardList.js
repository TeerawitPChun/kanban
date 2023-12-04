import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CircularProgress from "@mui/material/CircularProgress";

const BoardList = (props) => {
  const router = useRouter();
  const { boards, handleDrawerClose } = props;
  const [currentBoardId, setCurrentBoardId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (boards) {
      // setBoardList(boards);
      // if (!currentBoardId) {
      //   setCurrentBoardId(boards[0].id);
      // }
      setLoading(false);
    }
  }, [boards]);

  const selectBoard = (id) => {
    setCurrentBoardId(id);
    const fullPath = `/dashboard/${id}`;
    handleDrawerClose();
    router.push(fullPath);
    return;
  };
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      {boards &&
        boards.map((board) => {
          const isSelected = board.id == currentBoardId;
          return(
            <ListItem key={board.id}>
              <ListItemButton
                key={board.id}
                disabled={isSelected}
                onClick={() => {
                  selectBoard(board.id);
                }}
              >
                {isSelected && <ArrowRightIcon />}
                <ListItemText primary={board.title}></ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
    </List>
  );
};

export default BoardList;
