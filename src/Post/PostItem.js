import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Comments from "./services/Comments";
import { useSnackbar } from "../components/snackbar";
import { useUsername } from "../components/user";
import { sendLike } from "../Post/services/Like";
import DeletePost from "../Dashboard/services/DeletePost"; // Adjust the path if necessary
import { formatTimeAgo } from "../utils/timeAgo";
import { usePostCount } from "../components/pagination";
import { BiSolidQuoteAltLeft } from "react-icons/bi"; // Opening quote
import { BiSolidQuoteAltRight } from "react-icons/bi"; // Closing quote

const PostItem = ({ post, initialCommentCount, showDelete, onDelete }) => {
  const { decrementPostCount } = usePostCount();
  const [showComments, setShowComments] = useState(false);
  const [likeCount, setLikeCount] = useState(post.like.length || 0);
  const [commentCount, setCommentCount] = useState(post.comments.length || 0);
  const { showSuccessSnackbar, showWarningSnackbar } = useSnackbar();
  const { userId } = useUsername();
  const [expandStory, setExpandStory] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  console.log("commentcount ", commentCount);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isLiked, setIsLiked] = useState(
    post.like.some((like) => like.userId === userId)
  );

  const commentsRef = useRef(null);
  const timeAgo = formatTimeAgo(post.createdAt);

  const toggleComments = () => {
    setShowComments((prevShowComments) => !prevShowComments);
  };

  const handleLike = async () => {
    try {
      const result = await sendLike(post._id, userId);
      setLikeCount(result.likeCount);
      setIsLiked(!isLiked);
      showSuccessSnackbar(
        isLiked ? "You unliked the post!" : "You liked the post!"
      );
    } catch (error) {
      console.error("Error liking post:", error.message);
      showWarningSnackbar("Failed to like the post.");
    }
  };

  const handleDeletePost = async () => {
    try {
      await DeletePost(post._id);
      decrementPostCount();
      onDelete(post._id);
      showSuccessSnackbar("Post deleted successfully");
    } catch (error) {
      showWarningSnackbar(`Failed to delete the post: ${error.message}`);
    } finally {
      handleClose();
    }
  };

  return (
    <Card sx={{ width: 300, marginBottom: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {post.username.charAt(0)}
          </Avatar>
        }
        action={
          showDelete ? (
            <IconButton aria-label="settings" onClick={handleOpen}>
              <MoreVertIcon />
            </IconButton>
          ) : null
        }
        title={post.username}
        subheader={post.category}
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {showDelete && <MenuItem onClick={handleDeletePost}>Delete</MenuItem>}
      </Menu>
      {/* <CardMedia
        component="img"
        height="180"
        image={`http://localhost:8000/${post.image}`}
        alt={'image'}
      /> */}
      <CardContent
        sx={{
          overflow: "hidden",
          background: "rgba(173, 216, 230, 0.1)",
          transition: "all 0.3s ease-in-out", // Smooth transition for expansion
          minHeight: "120px", // Set a minimum height to ensure consistency
        }}
        onClick={() => setExpandStory((prev) => !prev)} // Toggle expandStory
      >
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: expandStory ? "unset" : 10, // Clamp lines if not expanded
            cursor: "pointer",
            position: "relative",
            paddingLeft: "24px", // Adjust padding for left quote icon
            paddingRight: "24px", // Adjust padding for right quote icon
            transition: "all 0.3s ease-in-out", // Smooth transition for content
            minHeight: "120px", // Ensure typography takes up at least 120px height
          }}
        >
          <BiSolidQuoteAltLeft
            style={{
              position: "relative",
              left: 0,
              top: "0%",
              fontSize: "24px", // Adjust the size of the quote icon
            }}
          />{" "}
          {/* Left (opening) quote icon */}
          {post.story}
          <BiSolidQuoteAltRight
            style={{
              position: "relative",
              right: 0,
              bottom: 0,
              fontSize: "24px", // Adjust the size of the quote icon
            }}
          />{" "}
          {/* Right (closing) quote icon */}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleLike} aria-label="like">
            <FavoriteIcon sx={{ color: isLiked ? "red" : "gray" }} />
          </IconButton>
          <Typography variant="body2" sx={{ marginLeft: "8px" }}>
            {likeCount}
          </Typography>
        </div>
        <IconButton aria-label="comments" onClick={toggleComments}>
          <CommentIcon />
          <Typography variant="body2" sx={{ marginLeft: "8px" }}>
            {commentCount}
          </Typography>
        </IconButton>
      </CardActions>
      <Typography variant="body2" sx={{ marginLeft: "8px" }}>
        {timeAgo}
      </Typography>
      <Divider />
      {showComments && (
        <div
          ref={commentsRef}
          style={{
            height: "200px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Comments postId={post._id} showAllComments={post.comments} />
        </div>
      )}
    </Card>
  );
};

export default PostItem;
