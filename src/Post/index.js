import React, { useEffect, useState } from "react";
import { Button, IconButton, Tooltip } from "@mui/material";
import Categories from "../components/blogCategory/Categories";
import ImageIcon from "@mui/icons-material/Image";
import Lottie from "lottie-react";
import Animation from "../assets/Animation.json";
import { useSnackbar } from "../components/snackbar";
import { useUsername } from "../components/user";
import { useNavigate } from "react-router-dom";
import { usePostCount } from "../components/pagination";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Post() {
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState("");
  const { incrementPostCount } = usePostCount();
  // const [image, setImage] = useState(null);
  const [story, setStory] = useState("");
  const { showSuccessSnackbar, showWarningSnackbar } = useSnackbar();
  const { usernameAccess, userId } = useUsername();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)"); // Define mobile breakpoint

  const handleSubmit = () => {
    if (!category) {
      showWarningSnackbar("Please select a category.");
      return;
    }

    // if (!image) {
    //   showSnackbar('Please upload an image.');
    //   return;
    // }

    if (!story) {
      showWarningSnackbar("Please write a story.");
      return;
    }
    if (!userId) {
      showWarningSnackbar("please First Login.");
      return;
    }

    setSubmitted(true);
  };

  useEffect(() => {
    const postUpload = async () => {
      const formData = new FormData();
      formData.append("category", category);
      // formData.append('image', image);
      formData.append("story", story);
      formData.append("username", usernameAccess);

      try {
        const response = await fetch(
          `http://localhost:8000/post/uploadpost/${userId}`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          console.log("Post upload failed");
          showWarningSnackbar("Failed to submit post");
          return;
        }

        const result = await response.json();
        console.log("Uploaded successfully", result);
        showSuccessSnackbar("Post submitted successfully");
        incrementPostCount();

        // Clear fields after successful submission
        setCategory("");
        // setImage(null);
        setStory("");
      } catch (errors) {
        console.error("Error submitting post", errors);
        showWarningSnackbar("Error submitting post");
      }
    };

    if (submitted) {
      postUpload();
      setSubmitted(false);
    }
  }, [
    submitted,
    category,
    story,
    usernameAccess,
    showSuccessSnackbar,
    showWarningSnackbar,
    userId,
  ]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",

        overflow: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Conditionally render the Lottie animation based on the screen size */}
      {!isMobile && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
        >
          <Lottie
            animationData={Animation}
            loop={true}
            autoplay={true}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      <div
        style={{
          background: "red",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          minHeight: "100vh",
          paddingTop: isMobile ? "20px" : "80px",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            width: isMobile ? "90%" : "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 0,
          }}
        >
          <Categories
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ paddingBottom: "20px", width: "100%" }}
          />

          {/* <Tooltip title="Upload an image">
            <IconButton
              color="primary"
              sx={{
                fontSize: 40,
                color: 'primary',
                '&:hover': {
                  color: 'green',
                },
              }}
              component="label"
            >
              <ImageIcon fontSize="inherit" />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </IconButton>
          </Tooltip> */}
          {/* 
          {image && (
            <div style={{ marginBottom: '20px' }}>
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                style={{
                  width: '200px',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
          )} */}

          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Write your story..."
            style={{
              padding: "20px",
              paddingRight: "50px",
              width: "100%",
              height: isMobile ? "400px" : "300px", // Adjust height for mobile view
              borderRadius: "4px",
              border: "none",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              outline: "none",
              marginBottom: "20px",
              overflowY: "scroll", // Enable scroll when content overflows
              resize: "none", // Disable resizing by user
              wordWrap: "break-word", // Ensures long words break and wrap to the next line
              whiteSpace: "pre-wrap", // Ensures that whitespace and newlines are preserved, and text will wrap
              fontSize: "14px", // Increase font size
              lineHeight: "1.5", // Increase line spacing for better readability
            }}
          />

          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
            onClick={handleSubmit}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
