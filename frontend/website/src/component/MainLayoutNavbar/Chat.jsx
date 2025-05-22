import { useState } from "react";
import { 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Paper,
  Divider
} from "@mui/material";
import { Chat as ChatIcon } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";

// Dummy data (same as before)
const classrooms = [
  { id: 1, name: "Math 101" },
  { id: 2, name: "Physics 202" },
  { id: 3, name: "Chemistry 303" },
];

const dummyChats = {
  1: [
    { sender: "Alice", message: "Hello Math class!" },
    { sender: "Bob", message: "Hi Alice!" },
  ],
  2: [
    { sender: "Charlie", message: "Physics is fun!" },
    { sender: "Dana", message: "Absolutely!" },
  ],
  3: [
    { sender: "Eve", message: "Chemistry rocks!" },
  ],
};

const Chat = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  const handleChatIconClick = () => {
    setSidebarOpen((prev) => !prev);
    setSelectedClassroom(null);
  };

  const handleClassroomClick = (id) => {
    setSelectedClassroom(id);
  };

  const handleBack = () => {
    setSelectedClassroom(null);
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleChatIconClick}
        aria-label="Open chat sidebar"
      >
        <ChatIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      >
        <Box sx={{ width: 300 }}>
          <AppBar position="static">
            <Toolbar>
              {selectedClassroom ? (
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleBack}
                  sx={{ mr: 2 }}
                >
                  <ArrowBackIcon />
                </IconButton>
              ) : null}
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                {selectedClassroom
                  ? classrooms.find((c) => c.id === selectedClassroom)?.name
                  : "Classroom Chats"}
              </Typography>
              <IconButton
                color="inherit"
                onClick={() => setSidebarOpen(false)}
                edge="end"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          {!selectedClassroom ? (
            <List>
              {classrooms.map((room) => (
                <ListItem
                  button
                  key={room.id}
                  onClick={() => handleClassroomClick(room.id)}
                >
                  <ListItemText primary={room.name} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ p: 2 }}>
              <Paper
                elevation={0}
                sx={{
                  maxHeight: "calc(100vh - 120px)",
                  overflow: "auto",
                }}
              >
                {dummyChats[selectedClassroom]?.map((msg, idx) => (
                  <Box key={idx} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" component="span">
                      {msg.sender}:
                    </Typography>{" "}
                    <Typography variant="body2" component="span">
                      {msg.message}
                    </Typography>
                    <Divider sx={{ mt: 1 }} />
                  </Box>
                ))}
              </Paper>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Chat;