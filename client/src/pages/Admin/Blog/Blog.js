import React, { useState, useEffect } from "react";
import { Button, notification } from "antd";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import Modal from "../../../components/Modal";
import PostsList from "../../../components/Admin/Blog/PostsList";
import { getPostsApi } from "../../../api/post";

import "./Blog.scss";

function Blog(props) {
  const { location, history } = props;
  const [posts, setPosts] = useState(null);
  const [reloadPosts, setReloadPosts] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const { page = 1 } = queryString.parse(location.search);
  console.log(posts);

  useEffect(() => {
    getPostsApi(12, page)
      .then((response) => {
        console.log(response);
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setPosts(response.posts);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });
    setReloadPosts(false);
  }, [page, reloadPosts]);
  if (!posts) {
    return null;
  }

  return (
    <div className="blog">
      <div className="blog__add-post">
        <Button type="primary">Nuevo Post</Button>
      </div>
      <PostsList />
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        width="75%"
      />
    </div>
  );
}

export default withRouter(Blog);
