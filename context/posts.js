// app language context definition

import * as React from "react";
import { SocketCtx } from "./socket";
import configs from "../configs/generals.json";
import axios from "axios";
import GuestContext, { GuestCtx } from "./guest";

const postCtx = React.createContext({});

const PostContext = ({ children }) => {
  const [printablePosts, setPrintablePosts] = React.useState([]);

  const posts = React.useRef([]);

  const socket = React.useContext(SocketCtx).subsSocket;

  React.useEffect(() => {
    const guest = JSON.parse(window.sessionStorage.getItem("guest"));

    console.log("current guest from posts context", guest);

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
      console.log("new like event payload", payload);

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

    return () => {
      console.log("cleaning up handlers");

      socket.off("NEW_DATUM");
      socket.off("NEW_COMMENT");
      socket.off("NEW_LIKE");
      socket.off("POST_REMOVED");
    };
  }, []);

  return (
    <postCtx.Provider value={{ posts, printablePosts, setPrintablePosts }}>
      {children}
    </postCtx.Provider>
  );
};

export { postCtx };
export default PostContext;