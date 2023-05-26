// component definition

import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { GuestCtx } from "../../context/guest";
import { LangCtx } from "../../context/lang";
import {
  BorderLeft,
  Close,
  Delete,
  Image,
  MoreVert,
  Send,
  ThumbDownAlt,
  ThumbDownOffAlt,
  ThumbUp,
  ThumbUpAlt,
  ThumbUpOffAlt,
} from "@mui/icons-material";
import mediaExtensionDetector from "../utils/mediaExtensionDetector";
import SnackMessage from "./SnackMessage";
import axios from "axios";
import configs from "../../configs/generals.json";

import { SocketCtx } from "../../context/socket";

const SocialWall = ({}) => {
  const theme = useTheme();

  const guest = React.useContext(GuestCtx).guest;
  const lang = React.useContext(LangCtx).lang;

  const [isThreaVisible, setISThreadVisisble] = React.useState(false);

  const posts = React.useRef([]);

  const [threadData, setThreadData] = React.useState({});

  const [commentText, setCommentText] = React.useState("");

  const [printablePosts, setPrintablePosts] = React.useState([]);

  const socket = React.useContext(SocketCtx).subsSocket;

  React.useEffect(() => {
    socket.on("NEW_DATUM", (datum) => {
      console.log("received the broadcasted datum", datum);

      new Audio("/sounds/post.mp3")?.play();

      console.log("current posts", posts);

      const newPosts = [datum, ...posts?.current];

      posts.current = newPosts;

      setPrintablePosts(posts.current);
    });

    socket.on("NEW_COMMENT", (datum) => {
      let postRows = [...posts?.current];

      new Audio("/sounds/post.mp3")?.play().catch((error) => {
        console.log(
          "an error has occured when trying to play The Sound",
          error
        );
      });

      [...postRows]?.some((target, index) => {
        if (target?.id === datum?.commentOf) {
          postRows[index]?.comments?.push(datum);

          return true;
        }
      });

      posts.current = postRows;

      setPrintablePosts(posts.current);
    });

    socket.on("NEW_LIKE", (payload) => {
      (async () => {
        await axios
          .get(
            `${configs?.backendUrl}/api/posts/${payload?.postId}?authorId=${guest?.id}&eventId=${guest?.event?.id}`
          )
          .then((result) => {
            let postRows = [...posts?.current];

            console.log("computed posts before like notif", postRows);

            [...postRows]?.some((target, index) => {
              if (target?.id === result?.data?.result[0]?.id) {
                postRows[index] = result?.data?.result[0];

                return true;
              } else {
                let isComment = false;

                console.log("didn't pass affter event");

                target?.comments?.some((_target, _index) => {
                  if (result?.data?.result[0]?.id === _target?.id) {
                    postRows[index].comments[_index] = result?.data?.result[0];

                    console.log("pass for comments");

                    isComment = true;

                    return true;
                  } else {
                    console.log("didn't pass for comment");
                  }
                });

                if (isComment) {
                  return true;
                }
              }
            });

            new Audio("/sounds/like.mp3")?.play().catch((error) => {
              console.log(
                "an error has occured when trying to play The Sound",
                error
              );
            });

            console.log("computed posts after like notif", postRows);

            posts.current = postRows;

            setPrintablePosts(posts.current);
          })
          .catch((error) => {
            console.log(
              "an error has occured when trying to get single post item",
              error
            );
          });
      })();
    });

    socket.on("POST_REMOVED", (payload) => {
      let newPosts = [...posts?.current];

      console.log("post remove evnt payload", payload);

      newPosts = [...newPosts]?.filter((post, index) => {
        if (post?.id !== payload?.postId) {
          newPosts[index].comments = newPosts[index].comments?.filter(
            (comment) => {
              return comment?.id !== payload?.postId;
            }
          );

          return true;
        }

        return false;
      });

      new Audio("/sounds/delete.mp3")?.play().catch((error) => {
        console.log(
          "an error has occured when trying to play The Sound",
          error
        );
      });

      console.log("computed posts", newPosts);

      posts.current = newPosts;

      setPrintablePosts(posts?.current);
    });
  }, []);

  React?.useEffect(() => {
    (async () => {
      await axios
        .get(
          `${configs?.backendUrl}/api/posts?authorId=${guest?.id}&eventId=${guest?.event?.id}`
        )
        .then((results) => {
          console.log("recaived posts data", results?.data?.posts);

          posts.current = results?.data?.posts;

          setPrintablePosts(posts.current);
        })
        .catch((error) => {
          console.log(
            "an error has occured when trying to get posts data",

            error
          );

          setSnackMessage(`Une erreur est survenue`);
          setSeverity("error");
          setIsnackVisible(true);
        });
    })();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsnackVisible(false);
  };

  const [snackMessage, setSnackMessage] = React.useState("");
  const [isSnackVisible, setIsnackVisible] = React.useState(false);
  const [severity, setSeverity] = React.useState("");

  const [fileSelected, setFileSelected] = React.useState(null);
  const [fileBlob, setFileBlob] = React.useState(null);

  const [commentFileBlob, setCommentFileBlob] = React.useState(null);

  const [pubTextContent, setPubTextContent] = React.useState("");

  const handleChange = async (event) => {
    event?.preventDefault();

    let fReader = new FileReader();
    fReader.readAsDataURL(event?.target?.files[0]);

    fReader.onload = function (oFREvent) {
      setFileSelected(oFREvent.target.result);
      setFileBlob(event?.target?.files[0]);
    };
  };

  const handleCommentChange = async (event) => {
    event?.preventDefault();

    let fReader = new FileReader();
    fReader.readAsDataURL(event?.target?.files[0]);

    fReader.onload = function (oFREvent) {
      setFileSelected(oFREvent.target.result);
      setCommentFileBlob(event?.target?.files[0]);
    };
  };

  const handlePost = async (event, isCommenting) => {
    event?.preventDefault();

    const form = new FormData();

    form.append("media", fileBlob);

    // upload media file

    let mediaFile = "";

    if (fileBlob !== null) {
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

    if (isCommenting ? commentText?.length > 3 : pubTextContent?.length > 3) {
      let submitObject = {
        mediaLink: mediaFile,
        authorPic: guest?.profile,
        authorName: guest?.fullName,
        textContent: isCommenting ? commentText : pubTextContent,
        commentOf: isCommenting ? threadData?.id : null,
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
              action: "CREATE",
              datum: newPost,
            });

            posts.current = [newPost, ...printablePosts];

            setPrintablePosts(posts?.current);
          } else {
            socket.emit("NEW_COMMENT", {
              action: "CREATE",
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

          if (isCommenting) {
            setCommentText("");
            setFileBlob(null);
          } else {
            setPubTextContent("");
            setFileBlob(null);
          }

          setSnackMessage(
            isCommenting
              ? "Commentaire ajoutée avec succès"
              : "Publication envoyéee avec succès"
          );
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
      setSnackMessage(
        `${
          isCommenting ? "Le commentaire" : "La publication"
        } doit avoir 3 caractères au moins`
      );
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
          console.log("like/unlike post result", results);

          socket.emit("NEW_LIKE", {
            action: "CREATE",
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
          console.log("like/unlike post result", results);

          socket.emit("NEW_LIKE", {
            action: "CREATE",
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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);
  const popoverId = popoverOpen ? "simple-popover" : undefined;

  const handleRemovePost = async (event, postId) => {
    event?.preventDefault();

    await axios
      .delete(
        `${configs?.backendUrl}/api/posts/${postId}?eventId=${guest?.event?.id}`
      )
      .then((res) => {
        socket.emit("POST_REMOVED", {
          action: "DELETE",
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

  return (
    <Stack
      sx={{
        width: "100%",
        p: 0,
        m: 0,
        height: "100%",
        flexGrow: 1,
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
          width: "100%",
          height: "100%",
          flexGrow: 1,
          bgcolor: theme.palette.common.black,
          alignItems: "flex-start",
        }}
      >
        <Stack
          sx={{
            width: isThreaVisible ? "70%" : "100%",
            height: "100%",
            maxHeight: "100%",
            overflowY: "auto",
            p: "2rem",
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              pb: "1rem",
              borderBottom: `1px solid ${theme.palette.grey[900]}`,
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.common.white,
                fontSize: "16px",
                fontWeight: theme.typography.fontWeightBold,
              }}
            >
              Publications
            </Typography>
          </Stack>
          <form
            onSubmit={handlePost}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                py: "1rem",
                alignItems: "center",
                //px: "1rem",
                width: "70%",
                maxWidth: "700px",
                minWidth: "200px",
                justifyContent: "space-between",
                "& *": {
                  color: `${theme.palette.common.white}!important`,
                },
              }}
            >
              <Avatar src={guest?.profile} />
              <TextField
                id="standard-basic"
                placeholder="Ecrivez quelque chose"
                label={null}
                variant="standard"
                name={"textContent"}
                onChange={(event) => {
                  event?.preventDefault();
                  setPubTextContent(event?.target?.value);
                }}
                value={pubTextContent}
                fullWidth
                sx={{
                  borderBottom: `.5px solid ${theme.palette.grey[500]}`,
                  ml: "1rem",
                }}
              />
              <input
                type="file"
                id={"mediaLink"}
                name={"mediaLink"}
                onChange={handleChange}
                style={{
                  display: "none",
                }}
              />
              <label
                htmlFor="mediaLink"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  sx={{
                    color: theme.palette.common.white,
                    fontSize: "22px",
                    ml: "1rem",
                    cursor: "pointer",
                  }}
                />
              </label>
              <Button
                type={"submit"}
                endIcon={
                  <Send
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: "12px",
                      width: "14px",
                    }}
                  />
                }
                sx={{
                  cursor: "pointer",
                  ml: "1rem",
                  color: theme.palette.common.white,
                  bgcolor: theme.palette.primary?.main,
                  "&:hover": {
                    bgcolor: theme.palette.primary?.main,
                  },
                  px: "1.3rem",
                  py: ".2rem",
                  fontSize: "14px",
                  borderRadius: 0,
                }}
              >
                Envoyer
              </Button>
            </Stack>
          </form>

          <Stack
            direction={"column"}
            sx={{
              alignItems: "center",
              width: "100%",
              height: "100%",
              maxHeight: "100%",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {printablePosts?.map((post) => {
              return (
                <Stack
                  direction={"row"}
                  sx={{
                    width: "70%",
                    maxWidth: "700px",
                    minWidth: "200px",
                    alignItems: "flex-start",
                    my: "1rem",
                  }}
                >
                  <Avatar
                    src={post?.authorPic}
                    size="small"
                    sx={{
                      mr: ".5rem",
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
                        alignItems: "flex-start",
                        width: "100%",
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
                            fontSize: "16px",
                          }}
                        >
                          {post?.authorName}
                        </Typography>
                        <Typography
                          sx={{
                            color: theme.palette.grey[700],
                            fontWeight: theme.typography.fontWeightLight,
                            fontSize: "12px",
                          }}
                        >
                          {new Date(post?.createdAt).toLocaleString()}
                        </Typography>
                      </Stack>

                      {post.authorPic === guest?.profile ? (
                        <IconButton
                          onClick={(event) => {
                            console.log("post to remove from list", post);

                            handleRemovePost(event, post?.id);
                          }}
                        >
                          <Delete
                            sx={{
                              color: theme.palette.error.main,
                              fontSize: "20px",
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
                        fontSize: "13px",
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
                          ?.type === "picture" ? (
                        <video width="100%" height="max-content" controls>
                          <source src={post?.mediaLink} type="video/mp4" />
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
                              handleLike({
                                event,
                                isLiked: post?.isLiked,
                                postId: post?.id,
                                score: 1,
                              });
                            }}
                            sx={{
                              m: 0,
                              p: 0,
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
                              color: theme.palette.grey[700],
                              fontWeight: theme.typography.fontWeightRegular,
                              fontSize: "12px",
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
                              color: theme.palette.grey[700],
                              fontWeight: theme.typography.fontWeightRegular,
                              fontSize: "12px",
                              cursor: "pointer",
                            }}
                          >
                            {post?.unlikes}
                          </Typography>
                        </Stack>
                      </Stack>
                      <Typography
                        onClick={(event) => {
                          event?.preventDefault();

                          setThreadData(post);
                          setISThreadVisisble(true);
                        }}
                        sx={{
                          color: theme.palette.grey[700],
                          fontWeight: theme.typography.fontWeightRegular,
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        {post?.comments?.length} commentaires
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
        <Stack
          direction={"column"}
          sx={{
            width: isThreaVisible ? "30%" : "0px",
            height: "100%",
            maxHeight: "100%",
            overflowY: "auto",
            borderLeft: `1px solid ${theme.palette.grey[900]}`,
            overflowX: "hidden",
            p: "2rem",
            display: !isThreaVisible ? "none" : undefined,
            transition: `.3s all`,
            overflowX: "hidden",
          }}
        >
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
                fontSize: "16px",
                fontWeight: theme.typography.fontWeightBold,
              }}
            >
              Thread
            </Typography>
            <Close
              onClick={(event) => {
                event?.preventDefault();
                setISThreadVisisble(false);
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
              minWidth: "200px",
              my: "1rem",
              overflowX: "hidden",
              pr: "1rem",
            }}
          >
            <Avatar
              src={threadData?.authorPic}
              size="small"
              sx={{
                mr: ".5rem",
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
                      fontSize: "16px",
                    }}
                  >
                    {threadData?.authorName}
                  </Typography>
                  <Typography
                    sx={{
                      color: theme.palette.grey[700],
                      fontWeight: theme.typography.fontWeightLight,
                      fontSize: "12px",
                    }}
                  >
                    {new Date(threadData?.createdAt)?.toLocaleString()}
                  </Typography>
                </Stack>
                {threadData.authorPic === guest?.profile ? (
                  <IconButton
                    onClick={(event) => {
                      console.log("post to remove from list", threadData);

                      handleRemovePost(event, threadData?.id);
                    }}
                  >
                    <Delete
                      sx={{
                        color: theme.palette.error.main,
                        fontSize: "20px",
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
                  fontSize: "13px",
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
                      color: theme.palette.grey[700],
                      fontWeight: theme.typography.fontWeightRegular,
                      fontSize: "12px",
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
                      color: theme.palette.grey[700],
                      fontWeight: theme.typography.fontWeightRegular,
                      fontSize: "12px",
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
              color: theme.palette.grey[700],
              fontWeight: theme.typography.fontWeightRegular,
              fontSize: "14px",
              my: ".5rem",
            }}
          >
            Commentaires
          </Typography>

          <Stack
            direction={"column"}
            sx={{
              alignItems: "center",
              width: "100%",
              maxWidth: "100%",
              height: "100%",
              maxHeight: "100%",
              overflowY: "auto",
              overflowX: "hidden",
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
                    maxWidth: "700px",
                    minWidth: "200px",
                    my: "1rem",
                  }}
                >
                  <Avatar
                    src={post?.authorPic}
                    size="small"
                    sx={{
                      mr: ".5rem",
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
                            fontSize: "16px",
                          }}
                        >
                          {post?.authorName}
                        </Typography>
                        <Typography
                          sx={{
                            color: theme.palette.grey[700],
                            fontWeight: theme.typography.fontWeightLight,
                            fontSize: "12px",
                          }}
                        >
                          {new Date(post?.createdAt)?.toLocaleString()}
                        </Typography>
                      </Stack>
                      {post.authorPic === guest?.profile ? (
                        <IconButton
                          onClick={(event) => {
                            console.log("post to remove from list", post);

                            handleRemovePost(event, post?.id);
                          }}
                        >
                          <Delete
                            sx={{
                              color: theme.palette.error.main,
                              fontSize: "20px",
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
                        fontSize: "13px",
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
                              color: theme.palette.grey[700],
                              fontWeight: theme.typography.fontWeightRegular,
                              fontSize: "12px",
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
                              color: theme.palette.grey[700],
                              fontWeight: theme.typography.fontWeightRegular,
                              fontSize: "12px",
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
              handlePost(event, true);
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
                placeholder="Votre commentaire"
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
                  ml: "1rem",
                  fontSize: "12px",
                }}
              />
              <input
                type="file"
                id={"mediaLink"}
                name={"mediaLink"}
                style={{
                  display: "none",
                }}
                onChange={handleCommentChange}
              />
              <label
                htmlFor="mediaLink"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  sx={{
                    color: theme.palette.common.white,
                    fontSize: "22px",
                    ml: "1rem",
                    cursor: "pointer",
                  }}
                />
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
      </Stack>
    </Stack>
  );
};

export default SocialWall;
