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
import { viewportsCtx } from "../../context/viewports";
import ChatThread from "./ChatThread";
import PostContext, { postCtx } from "../../context/posts";

const SocialWall = ({}) => {
  const theme = useTheme();

  const guest = React.useContext(GuestCtx).guest;
  const lang = React.useContext(LangCtx).lang;

  const [isThreaVisible, setISThreadVisisble] = React.useState(false);

  const posts = React.useContext(postCtx)?.posts;

  const setPrintablePosts = React.useContext(postCtx)?.setPrintablePosts;
  const printablePosts = React.useContext(postCtx)?.printablePosts;

  const socket = React.useContext(SocketCtx).subsSocket;

  const threadData = React.useContext(postCtx)?.threadData;
  const setThreadData = React.useContext(postCtx)?.setThreadData;
  const staticThreadData = React.useRef(threadData);

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

  const [pubTextContent, setPubTextContent] = React.useState("");

  const handleChange = async (event) => {
    event?.preventDefault();

    let fReader = new FileReader();
    fReader.readAsDataURL(event?.target?.files[0]);

    fReader.onload = function (oFREvent) {
      setFileSelected(oFREvent.target.result);

      console.log("blob value content", event?.target?.files[0]);

      setFileBlob(event?.target?.files[0]);
    };
  };

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

    if (pubTextContent?.length > 3) {
      let submitObject = {
        mediaLink: mediaFile,
        authorPic: guest?.profile,
        authorName: guest?.fullName,
        textContent: pubTextContent,
        commentOf: null,
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

          setPubTextContent("");
          setFileBlob(null);
          setFileSelected(null);

          setSnackMessage("Publication envoyéee avec succès");
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
        `
         La publication est trop courte`
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
          console.log("like/unlike post result and socket", results, socket);

          console.log("like/dislike event payload", {
            eventId: guest?.event?.id,
            postId,
          });

          socket.emit("NEW_LIKE", {
            eventId: guest?.event?.id,
            postId,
          });

          new Audio("/sounds/like.mp3")?.play().catch((error) => {
            console.log(
              "an error has occured when trying to play The Sound",
              error
            );
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

          console.log("like/dislike event payload", {
            eventId: guest?.event?.id,
            postId,
          });

          socket.emit("NEW_LIKE", {
            eventId: guest?.event?.id,
            postId,
          });

          new Audio("/sounds/like.mp3")?.play().catch((error) => {
            console.log(
              "an error has occured when trying to play The Sound",
              error
            );
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

  const screen870 = React.useContext(viewportsCtx)?.screen870;
  const screen660 = React.useContext(viewportsCtx)?.screen660;

  const setIsMenuCollapsed = React.useContext(viewportsCtx).setIsMenuCollapsed;
  const isMenuCollapsed = React.useContext(LangCtx).isMenuCollapsed;

  const setDefaultSwippeableContent =
    React.useContext(viewportsCtx)?.setDefaultSwippeableContent;

  const setIsSwippeableVisible =
    React.useContext(viewportsCtx)?.setIsSwippeableVisible;

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
          borderRadius: "1.5rem",
          flexWrap: "no-wrap",
        }}
      >
        <Stack
          sx={{
            width:
              screen660 || !isThreaVisible ? "100%" : screen870 ? "60%" : "70%",
            height: "100%",
            maxHeight: "100%",
            overflowY: "auto",
            p: screen870 ? "1rem" : "2rem",
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
                fontSize: "14px",
                fontWeight: theme.typography.fontWeightBold,
              }}
            >
              {lang === "fr" ? "Publications" : "Posts"}
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
                width: screen870 ? "95%" : "70%",
                maxWidth: "700px",
                minWidth: "200px",
                justifyContent: "space-between",
                "& *": {
                  color: `${theme.palette.common.white}!important`,
                },
              }}
            >
              <Avatar
                src={guest?.profile}
                sx={{
                  width: "30px",
                  height: "30px",
                }}
              />
              <TextField
                id="standard-basic"
                placeholder={
                  lang === "fr" ? "Ecrivez quelque chose" : "Type something"
                }
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
                  ml: screen870 ? ".5rem" : "1rem",
                }}
                inputProps={{
                  style: {
                    fontSize: "12px",
                  },
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
                {fileSelected ? (
                  <Avatar
                    src={fileSelected}
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
              <Button
                type={"submit"}
                endIcon={
                  <Send
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: "10px",
                      width: "14px",
                    }}
                  />
                }
                sx={{
                  cursor: "pointer",
                  color: theme.palette.common.white,
                  bgcolor: theme.palette.primary?.main,
                  "&:hover": {
                    bgcolor: theme.palette.primary?.main,
                  },
                  px: "1.2rem",
                  py: ".1rem",
                  fontSize: "12px",
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
                    width: screen870 ? "95%" : "70%",
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
                      width: "30px",
                      height: "30px",
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
                            fontSize: "14px",
                          }}
                        >
                          {post?.authorName}
                        </Typography>
                        <Typography
                          sx={{
                            color: theme.palette.grey[500],
                            fontWeight: theme.typography.fontWeightLight,
                            fontSize: "10px",
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
                              fontSize: "18px",
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
                        fontSize: "12px",
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
                              color: theme.palette.grey[500],
                              fontWeight: theme.typography.fontWeightRegular,
                              fontSize: "10px",
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
                              color: theme.palette.grey[500],
                              fontWeight: theme.typography.fontWeightRegular,
                              fontSize: "10px",
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

                          staticThreadData.current = post;

                          setISThreadVisisble(true);

                          // collapsing the menu if on tablet and under

                          if (!screen660) {
                            setIsMenuCollapsed(true);
                          } else {
                            setDefaultSwippeableContent(
                              <ChatThread
                                isThreaVisible={isThreaVisible}
                                setISThreadVisisble={setISThreadVisisble}
                              />
                            );

                            setIsSwippeableVisible(true);
                          }
                        }}
                        sx={{
                          color: theme.palette.grey[500],
                          fontWeight: theme.typography.fontWeightRegular,
                          fontSize: "10px",
                          cursor: "pointer",
                        }}
                      >
                        {post?.comments?.length}{" "}
                        {lang === "fr" ? "commentaires" : "Comments"}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
        {!screen660 ? (
          <ChatThread
            isThreaVisible={isThreaVisible}
            setISThreadVisisble={setISThreadVisisble}
          />
        ) : (
          ""
        )}
      </Stack>
    </Stack>
  );
};

export default SocialWall;
