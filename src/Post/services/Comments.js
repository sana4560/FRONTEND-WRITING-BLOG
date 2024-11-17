import React, { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useSnackbar } from "../../components/snackbar";
import { useUsername } from "../../components/user";
import {
  Card,
  TextField,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { formatTimeAgo } from "../../utils/timeAgo";

export default function Comments({
  postId,
  showAllComments,
  onUpdateCommentCount,
}) {
  const [sendText, setSendText] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { showSuccessSnackbar, showWarningSnackbar } = useSnackbar();
  const { userId } = useUsername();

  const handleSubmit = () => {
    if (commentText.trim() === "") {
      showWarningSnackbar("Comment cannot be empty");
      return;
    }
    setSendText(true);
  };

  useEffect(() => {
    const sendComment = async () => {
      try {
        const response = await fetch(
          `${process.env.BASE_URL}/post/comments/${postId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, commentText }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Network response was not ok");
        }

        const data = await response.json();

        // Update comment count on success
        showSuccessSnackbar("Comment submitted successfully");
        setCommentText(""); // Clear input on success
      } catch (error) {
        console.error("Error submitting comment:", error.message);
        showWarningSnackbar(`First Login`);
        setCommentText(""); // Clear input on failure too
      } finally {
        setSendText(false);
      }
    };

    if (sendText) {
      sendComment();
    }
  }, [
    sendText,
    userId,
    commentText,
    postId,
    showSuccessSnackbar,
    showWarningSnackbar,
  ]);

  return (
    <div style={{ overflowY: "auto", height: "75%" }}>
      <List sx={{ flexGrow: 1 }}>
        {showAllComments && showAllComments.length > 0 ? (
          showAllComments.map((comment, index) => (
            <ListItem key={index}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: red[500],
                    height: "20px",
                    width: "20px",
                    marginRight: "8px",
                  }}
                  aria-label="recipe"
                >
                  {comment.userId.username.charAt(0)}
                </Avatar>

                <div>
                  <Typography
                    variant="body1"
                    style={{
                      fontWeight: "bold",
                      marginRight: "8px",
                      fontSize: "11px", // Reduce text size for username
                      display: "inline-block", // Make username inline with the comment text
                    }}
                  >
                    {comment.userId.username}
                  </Typography>

                  <Typography
                    variant="body2"
                    style={{
                      fontSize: "12px", // Reduce text size for comment text
                      display: "inline-block", // Make comment text inline with the username
                      marginRight: "8px", // Optional: space between comment text and timestamp
                    }}
                  >
                    {comment.commentText}
                  </Typography>

                  <Typography
                    variant="caption"
                    style={{
                      fontSize: "10px", // Smaller text for timestamp
                      color: "gray",
                      marginTop: "4px",
                      display: "inline-block", // Make timestamp inline with the comment text
                    }}
                  >
                    {formatTimeAgo(comment.createdAt).toLocaleString()}{" "}
                    {/* Comment time */}
                  </Typography>
                </div>
              </div>
            </ListItem>
          ))
        ) : (
          <Typography>No comments yet.</Typography>
        )}
      </List>

      <div
        style={{
          height: "25%",
          position: "absolute",
          bottom: "0px",
          left: 0,
          right: 0,
          background: "yellow",
        }}
      >
        <TextField
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          fullWidth
          sx={{
            background: "white",

            // Shadow effect for separation
          }}
          placeholder="Type your comment here"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSubmit}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
            style: { border: "none" },
          }}
        />
      </div>
    </div>
  );
}
