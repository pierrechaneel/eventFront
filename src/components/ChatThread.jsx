// component definition

import * as React from "react";
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Close,
  Delete,
  Image,
  Send,
  ThumbDownAlt,
  ThumbDownOffAlt,
  ThumbUpAlt,
  ThumbUpOffAlt,
} from "@mui/icons-material";
import { viewportsCtx } from "../../context/viewports";
import { GuestCtx } from "../../context/guest";
import { LangCtx } from "../../context/lang";
import mediaExtensionDetector from "../utils/mediaExtensionDetector";
import { SocketCtx } from "../../context/socket";
import { postCtx } from "../../context/posts";
import axios from "axios";
import configs from "../../configs/generals.json";
import SnackMessage from "./SnackMessage";

const ChatThread = ({ threadData, isThreaVisible, setISThreadVisisble }) => {
  const theme = useTheme();

  const setPrintablePosts = React.useContext(postCtx)?.setPrintablePosts;
  const printablePosts = React.useContext(postCtx)?.printablePosts;

  const posts = React.useContext(postCtx)?.posts;

  const handleRemovePost = async (event, postId) => {
    event?.preventDefault();

    await axios
      .delete(
        `${configs?.backendUrl}/api/posts/${postId}?eventId=${guest?.event?.id}`
      )
      .then((res) => {
        socket.emit("POST_REMOVED", {
          eventId: guest?.event?.id,
          postId,
        });

        setSnackMessage("Publication supprimée avec succès");
        setSeverity("success");
        setIsnackVisible(true);
      })
      .catch((error) => {
        console.log("an error has occured when trying to remove a post", error);

        setSnackMessage("Une erreur est survenue");
        setSeverity("error");
        setIsnackVisible(true);
      });
  };

  const socket = React.useContext(SocketCtx).subsSocket;

  const setIsMenuCollapsed = React.useContext(viewportsCtx).setIsMenuCollapsed;
  const isMenuCollapsed = React.useContext(LangCtx).isMenuCollapsed;

  const setDefaultSwippeableContent =
    React.useContext(viewportsCtx)?.setDefaultSwippeableContent;

  const setIsSwippeableVisible =
    React.useContext(viewportsCtx)?.setIsSwippeableVisible;

  const screen660 = React.useContext(viewportsCtx)?.screen660;
  const screen870 = React.useContext(viewportsCtx)?.screen870;

  const guest = React.useContext(GuestCtx).guest;
  const lang = React.useContext(LangCtx).lang;

  console.log("current workin guest", { guest: GuestCtx, lang });

  const handleCommentChange = async (event) => {
    event?.preventDefault();

    console.log("changes for comments");

    let fReader = new FileReader();
    fReader.readAsDataURL(event?.target?.files[0]);

    fReader.onload = function (oFREvent) {
      setCommentFileSelected(oFREvent.target.result);
      setCommentFileBlob(event?.target?.files[0]);
    };
  };

  const handlePost = async (event) => {
    event?.preventDefault();

    const form = new FormData();

    form.append("media", commentFileBlob);

    // upload media file

    let mediaFile = "";

    if (commentFileBlob !== null) {
      await axios
        .post("/api/uploads/media", form, {
          headers: {
            user: "BQJR9400",
          },
        })
        .then(async (results) => {
          console.log("file uploading results", { res: results?.data });

          mediaFile = results?.data?.path;
        })
        .catch((error) => {
          console.log(
            "an error has occured when uploading the media file",
            error
          );
          setSnackMessage("Une erreur est survenue!! Réessayez");
          setSeverity("error");
          setIsnackVisible(true);
        });
    }

    if (commentText?.length > 3) {
      let submitObject = {
        mediaLink: mediaFile,
        authorPic: guest?.profile,
        authorName: guest?.fullName,
        textContent: commentText,
        commentOf: threadData?.id,
        eventId: guest?.event?.id,
      };

      console.log("submit obj for social wall post ", submitObject);

      await axios
        .post(
          `${configs?.backendUrl}/api/posts?author=${"BQJR9400"}&authorId=${
            guest?.id
          }`,
          submitObject,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${"BQJR9400"}`,
              user: "BQJR9400",
            },
          }
        )
        .then(async (res) => {
          const newPost = res?.data?.result[0];

          if (newPost?.commentOf === null) {
            socket?.emit("NEW_DATUM", {
              eventId: guest?.event?.id,
              datum: newPost,
            });

            posts.current = [newPost, ...printablePosts];

            setPrintablePosts(posts?.current);
          } else {
            socket.emit("NEW_COMMENT", {
              eventId: guest?.event?.id,
              datum: newPost,
            });

            let postRows = [...printablePosts];

            [...postRows]?.some((target, index) => {
              if (target?.id === newPost?.commentOf) {
                postRows[index]?.comments?.push(newPost);

                return true;
              }
            });

            posts.current = postRows;

            setPrintablePosts(posts?.current);
          }

          setCommentText("");
          setCommentFileBlob(null);
          setCommentFileSelected(null);

          setSnackMessage("Commentaire ajoutée avec succès");
          setSeverity("success");
          setIsnackVisible(true);
        })
        .catch((error) => {
          console.error(
            "An error has occured when trying to send post info",
            error
          );
          // setIsCreateRowModalOpen(false);

          setSnackMessage("Une erreur est survenue!! Réessayez");
          setSeverity("error");
          setIsnackVisible(true);
        });
    } else {
      setSnackMessage(`Le commentaire est trop court`);
      setSeverity("error");
      setIsnackVisible(true);
    }
  };

  const handleLike = async ({ event, postId, score, isLiked }) => {
    event?.preventDefault();

    console.log("received like params", { postId, score, isLiked });

    if (isLiked) {
      await axios
        .delete(
          `${configs?.backendUrl}/api/posts/likes?postId=${postId}&score=${score}&authorId=${guest?.id}`
        )
        .then((results) => {
          console.log("like/unlike post result and socket", results, socket);

          console.log("like/dislike event payload", {
            eventId: guest?.event?.id,
            postId,
          });

          socket.emit("NEW_LIKE", {
            eventId: guest?.event?.id,
            postId,
          });
        })
        .catch((error) => {
          console.log(
            "an error has occured when trying post pub like/unlike",
            error
          );

          setSnackMessage("Une erreur est survenue!! Réessayez");
          setSeverity("error");
          setIsnackVisible(true);
        });
    } else {
      await axios
        .post(`${configs?.backendUrl}/api/posts/likes`, {
          score: score,
          postId: postId,
          author: guest?.id,
        })
        .then((results) => {
          console.log("like/unlike post result and socket", results, socket);

          console.log("like/dislike event payload", {
            eventId: guest?.event?.id,
            postId,
          });

          socket.emit("NEW_LIKE", {
            eventId: guest?.event?.id,
            postId,
          });
        })
        .catch((error) => {
          console.log(
            "an error has occured when trying post pub like/unlike",
            error
          );

          setSnackMessage("Une erreur est survenue!! Réessayez");
          setSeverity("error");
          setIsnackVisible(true);
        });
    }

    // console.log("end up for likes");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsnackVisible(false);
  };

  const [snackMessage, setSnackMessage] = React.useState("");
  const [isSnackVisible, setIsnackVisible] = React.useState(false);
  const [severity, setSeverity] = React.useState("");

  const [commentFileBlob, setCommentFileBlob] = React.useState(null);
  const [commentText, setCommentText] = React.useState("");
  const [commentfileSelected, setCommentFileSelected] = React.useState(null);

  return (
    <Stack
      direction={"column"}
      sx={{
        width: screen660
          ? "100%"
          : isThreaVisible
          ? screen870
            ? "40%"
            : "30%"
          : "0px",
        height: "100%",
        maxHeight: "100%",
        maxWidth: screen660 ? "100%" : screen870 ? "40%" : "30%",
        overflowY: "auto",
        borderLeft: screen660 ? "none" : `1px solid ${theme.palette.grey[900]}`,
        overflowX: "auto",
        p: screen870 ? "1rem" : "2rem",
        transition: `.3s all`,
        overflowX: "auto",
        display: !isThreaVisible && !screen660 ? "none" : undefined,
        mx: screen660 ? "auto" : undefined,
      }}
    >
      {isSnackVisible ? (
        <SnackMessage
          handleClose={handleClose}
          message={snackMessage}
          severity={severity}
        />
      ) : (
        ""
      )}
      <Stack
        direction={"row"}
        sx={{
          alignItems: "center",
          pb: "1rem",
          borderBottom: `1px solid ${theme.palette.grey[900]}`,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            color: theme.palette.common.white,
            fontSize: screen870 ? "12px" : "14px",
            fontWeight: theme.typography.fontWeightBold,
          }}
        >
          {lang === "fr" ? "Discussion" : "Thread"}
        </Typography>
        <Close
          onClick={(event) => {
            event?.preventDefault();

            if (screen660) {
              setIsSwippeableVisible(false);
            } else {
              setISThreadVisisble(false);
            }
          }}
          sx={{
            color: theme.palette.common.white,
            fontSize: "22px",
            cursor: "pointer",
          }}
        />
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          width: "100%",
          alignItems: "flex-start",
          maxWidth: "700px",
          minWidth: "150px",
          my: "1rem",
          overflowX: "auto",
          pr: "1rem",
        }}
      >
        <Avatar
          src={threadData?.authorPic}
          size="small"
          sx={{
            mr: ".5rem",
            width: screen870 ? "15px" : "30px",
            height: screen870 ? "15px" : "30px",
          }}
        />
        <Stack
          direction={"column"}
          sx={{
            flexGrow: 1,
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Stack
              direction={"column"}
              sx={{
                mb: ".5rem",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.common.white,
                  fontWeight: theme.typography.fontWeightBold,
                  fontSize: screen870 ? "12px" : "14px",
                }}
              >
                {threadData?.authorName}
              </Typography>
              <Typography
                sx={{
                  color: theme.palette.grey[500],
                  fontWeight: theme.typography.fontWeightLight,
                  fontSize: screen870 ? "8px" : "10px",
                }}
              >
                {new Date(threadData?.createdAt).toLocaleDateString(
                  `${lang}-${lang?.toUpperCase()}`,
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </Typography>
            </Stack>
            {threadData.authorName === guest?.fullName ? (
              <IconButton
                onClick={(event) => {
                  console.log("post to remove from list", threadData);

                  handleRemovePost(event, threadData?.id);
                }}
              >
                <Delete
                  sx={{
                    color: theme.palette.error.main,
                    fontSize: screen870 ? "14px" : "18px",
                  }}
                />
              </IconButton>
            ) : (
              ""
            )}
          </Stack>
          <Typography
            sx={{
              color: theme.palette.common.white,
              fontWeight: theme.typography.fontWeightRegular,
              fontSize: screen870 ? "10px" : "12px",
            }}
          >
            {threadData?.textContent}
          </Typography>
          <Box
            sx={{
              width: "100%",
              maxWidth: "100%",
              my: ".5rem",
              overflowX: "hidden",
            }}
          >
            {mediaExtensionDetector({ fileName: threadData?.mediaLink })
              ?.type === "picture" ? (
              <img
                src={threadData?.mediaLink}
                alt={"media"}
                style={{
                  width: "100%",
                }}
              />
            ) : mediaExtensionDetector({ fileName: threadData?.mediaLink })
                ?.type === "video" ? (
              <video width="100%" height="max-content" controls>
                <source src={threadData?.mediaLink} type="video/mp4" />
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: theme.typography.fontWeightRegular,
                    color: theme.palette.common.white,
                  }}
                >
                  Your browser does not support the video
                </Typography>
              </video>
            ) : (
              ""
            )}
          </Box>
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                mr: "1rem",
              }}
            >
              <Box
                onClick={(event) => {
                  handleLike({
                    event,
                    isLiked: threadData?.isLiked,
                    postId: threadData?.id,
                    score: 1,
                  });
                }}
                sx={{
                  m: 0,
                  p: 0,
                }}
              >
                {threadData?.isLiked ? (
                  <ThumbUpAlt
                    sx={{
                      color: theme.palette.common.white,
                      fontSize: "16px",
                      mr: ".5rem",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <ThumbUpOffAlt
                    sx={{
                      color: theme.palette.common.white,
                      fontSize: "16px",
                      mr: ".2rem",
                      cursor: "pointer",
                    }}
                  />
                )}
              </Box>
              <Typography
                sx={{
                  color: theme.palette.grey[500],
                  fontWeight: theme.typography.fontWeightRegular,
                  fontSize: screen870 ? "8px" : "10px",
                  cursor: "pointer",
                }}
              >
                {threadData?.likes}
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
              }}
            >
              <Box
                onClick={(event) => {
                  handleLike({
                    event,
                    isLiked: threadData?.isDisliked,
                    postId: threadData?.id,
                    score: -1,
                  });
                }}
                sx={{
                  m: 0,
                  p: 0,
                }}
              >
                {threadData?.isDisliked ? (
                  <ThumbDownAlt
                    sx={{
                      color: theme.palette.common.white,
                      fontSize: "16px",
                      mr: ".2rem",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <ThumbDownOffAlt
                    sx={{
                      color: theme.palette.common.white,
                      fontSize: "16px",
                      mr: ".2rem",
                      cursor: "pointer",
                    }}
                  />
                )}
              </Box>
              <Typography
                sx={{
                  color: theme.palette.grey[500],
                  fontWeight: theme.typography.fontWeightRegular,
                  fontSize: screen870 ? "8px" : "10px",
                  cursor: "pointer",
                }}
              >
                {threadData?.unlikes}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Typography
        sx={{
          color: theme.palette.grey[500],
          fontWeight: theme.typography.fontWeightRegular,
          fontSize: screen870 ? "8px" : "10px",
          my: ".5rem",
        }}
      >
        {lang === "fr" ? "Commentaires" : "Comments"}
      </Typography>
      <Stack
        direction={"column"}
        sx={{
          alignItems: "center",
          width: "100%",
          maxWidth: "100%",
          height: "100%",
          maxHeight: "100%",
          overflowX: "auto",
          flexGrow: 1,
          overflowX: "hidden",
          pr: "1rem",
        }}
      >
        {threadData?.comments?.map((post) => {
          return (
            <Stack
              direction={"row"}
              sx={{
                width: "100%",
                alignItems: "flex-start",
                maxWidth: "100%",
                minWidth: "150px",
                my: "1rem",
                //overflowX: "auto",
              }}
            >
              <Avatar
                src={post?.authorPic}
                size="small"
                sx={{
                  mr: ".5rem",
                  width: screen870 ? "15px" : "30px",
                  height: screen870 ? "15px" : "30px",
                }}
              />
              <Stack
                direction={"column"}
                sx={{
                  flexGrow: 1,
                }}
              >
                <Stack
                  direction={"row"}
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Stack
                    direction={"column"}
                    sx={{
                      mb: ".5rem",
                    }}
                  >
                    <Typography
                      sx={{
                        color: theme.palette.common.white,
                        fontWeight: theme.typography.fontWeightBold,
                        fontSize: screen870 ? "12px" : "14px",
                      }}
                    >
                      {post?.authorName}
                    </Typography>
                    <Typography
                      sx={{
                        color: theme.palette.grey[500],
                        fontWeight: theme.typography.fontWeightLight,
                        fontSize: screen870 ? "12px" : "10px",
                      }}
                    >
                      {new Date(post?.createdAt).toLocaleDateString(
                        `${lang}-${lang?.toUpperCase()}`,
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </Typography>
                  </Stack>
                  {post.authorName === guest?.fullName ? (
                    <IconButton
                      onClick={(event) => {
                        console.log("post to remove from list", post);

                        handleRemovePost(event, post?.id);
                      }}
                    >
                      <Delete
                        sx={{
                          color: theme.palette.error.main,
                          fontSize: screen870 ? "14px" : "18px",
                        }}
                      />
                    </IconButton>
                  ) : (
                    ""
                  )}
                </Stack>
                <Typography
                  sx={{
                    color: theme.palette.common.white,
                    fontWeight: theme.typography.fontWeightRegular,
                    fontSize: screen870 ? "10px" : "12px",
                  }}
                >
                  {post?.textContent}
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    my: ".5rem",
                  }}
                >
                  {mediaExtensionDetector({ fileName: post?.mediaLink })
                    ?.type === "picture" ? (
                    <img
                      src={post?.mediaLink}
                      alt={"media"}
                      style={{
                        width: "100%",
                      }}
                    />
                  ) : mediaExtensionDetector({ fileName: post?.mediaLink })
                      ?.type === "video" ? (
                    <video width="100%" height="max-content" controls>
                      <source src={post?.mediaLink} type="video/mp4" />
                      <Typography
                        sx={{
                          textAlign: "center",
                          fontSize: "12px",
                          fontWeight: theme.typography.fontWeightRegular,
                          color: theme.palette.common.white,
                        }}
                      >
                        Your browser does not support the video
                      </Typography>
                    </video>
                  ) : (
                    ""
                  )}
                </Box>
                <Stack
                  direction={"row"}
                  sx={{
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Stack
                    direction={"row"}
                    sx={{
                      alignItems: "center",
                    }}
                  >
                    <Stack
                      direction={"row"}
                      sx={{
                        alignItems: "center",
                        mr: "1rem",
                      }}
                    >
                      <Box
                        onClick={(event) => {
                          console.log("current post for likes", post);
                          handleLike({
                            event,
                            isLiked: post?.isLiked,
                            postId: post?.id,
                            score: 1,
                          });
                        }}
                      >
                        {post?.isLiked ? (
                          <ThumbUpAlt
                            sx={{
                              color: theme.palette.common.white,
                              fontSize: "16px",
                              mr: ".5rem",
                              cursor: "pointer",
                            }}
                          />
                        ) : (
                          <ThumbUpOffAlt
                            sx={{
                              color: theme.palette.common.white,
                              fontSize: "16px",
                              mr: ".2rem",
                              cursor: "pointer",
                            }}
                          />
                        )}
                      </Box>
                      <Typography
                        sx={{
                          color: theme.palette.grey[500],
                          fontWeight: theme.typography.fontWeightRegular,
                          fontSize: screen870 ? "8px" : "10px",
                          cursor: "pointer",
                        }}
                      >
                        {post?.likes}
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      sx={{
                        alignItems: "center",
                      }}
                    >
                      <Box
                        onClick={(event) => {
                          console.log("current post for likes", post);
                          handleLike({
                            event,
                            isLiked: post?.isDisliked,
                            postId: post?.id,
                            score: -1,
                          });
                        }}
                        sx={{
                          m: 0,
                          p: 0,
                        }}
                      >
                        {post?.isDisliked ? (
                          <ThumbDownAlt
                            sx={{
                              color: theme.palette.common.white,
                              fontSize: "16px",
                              mr: ".2rem",
                              cursor: "pointer",
                            }}
                          />
                        ) : (
                          <ThumbDownOffAlt
                            sx={{
                              color: theme.palette.common.white,
                              fontSize: "16px",
                              mr: ".2rem",
                              cursor: "pointer",
                            }}
                          />
                        )}
                      </Box>
                      <Typography
                        sx={{
                          color: theme.palette.grey[500],
                          fontWeight: theme.typography.fontWeightRegular,
                          fontSize: screen870 ? "8px" : "10px",
                          cursor: "pointer",
                        }}
                      >
                        {post?.unlikes}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
      <form
        onSubmit={(event) => {
          handlePost(event);
        }}
        style={{
          width: "100%",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            py: "1rem",
            alignItems: "center",
            px: "0rem",
            width: "100%",
            justifyContent: "space-between",
            "& *": {
              color: `${theme.palette.common.white}!important`,
            },
          }}
        >
          <TextField
            id="standard-basic"
            placeholder={
              lang === "fr" ? "Votre commentaire" : "Leave your thoughts"
            }
            label={null}
            variant="standard"
            name={"commentText"}
            value={commentText}
            onChange={(event) => {
              event?.preventDefault();
              setCommentText(event?.target?.value);
            }}
            fullWidth
            sx={{
              borderBottom: `.5px solid ${theme.palette.grey[500]}`,
              ml: screen870 ? ".5rem" : "1rem",
              fontSize: "12px",
            }}
            inputProps={{
              style: {
                fontSize: "12px",
              },
            }}
          />
          <input
            type="file"
            id={"mediaLinkComment"}
            name={"mediaLinkComment"}
            style={{
              display: "none",
            }}
            onChange={handleCommentChange}
          />
          <label
            htmlFor="mediaLinkComment"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {commentfileSelected ? (
              <Avatar
                src={commentfileSelected}
                sx={{
                  color: theme.palette.common.white,
                  width: "20px",
                  height: "20px",
                  mx: screen870 ? ".2rem" : ".5rem",
                  cursor: "pointer",
                }}
              />
            ) : (
              <Image
                sx={{
                  color: theme.palette.grey[300],
                  fontSize: "20px",
                  mx: screen870 ? ".2rem" : ".5rem",
                  cursor: "pointer",
                }}
              />
            )}
          </label>
          <IconButton
            type={"submit"}
            sx={{
              cursor: "pointer",
            }}
          >
            <Send
              sx={{
                color: theme.palette.primary.main,
                fontSize: "12px",
                width: "14px",
              }}
            />
          </IconButton>
        </Stack>
      </form>
    </Stack>
  );
};

export default ChatThread;
