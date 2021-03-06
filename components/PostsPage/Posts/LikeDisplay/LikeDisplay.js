import { useState } from "react";
import styles from "./likeDisplay.module.css";

import UsersModal from "./UsersModal/UsersModal";
import BackDrop from "../../../BackDrop/BackDrop";

const LikeDisplay = (props) => {
  const [users, setUsers] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { post } = props;

  const displayLikeUserHandler = async () => {
    setShowModal(true);
    const resp = await fetch(
      `http://localhost:3000/api/posts/${post._id}/like`
    );
    const json = await resp.json();
    setUsers(json);
  };

  const setHideModalHandler = () => {
    setUsers(null);
    setShowModal(false);
  };

  return (
    <>
      <span onClick={displayLikeUserHandler} className={styles.postLikes}>
        {post.likes.length} Likes
      </span>
      {showModal && (
        <>
          <BackDrop clicked={setHideModalHandler} showBackDrop={showModal} />
          <UsersModal users={users} />
        </>
      )}
    </>
  );
};

export default LikeDisplay;
