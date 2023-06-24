import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { updateUserThunk } from "../services/users-thunk";

const Text = styled.p`
  text-align: left;
  color: white;
  font-family: "Roboto", sans-serif;
`;

function ProfileLikes() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.currentUser);
  const [profile, setProfile] = useState(currentUser);
  const [posts, setPosts] = useState(currentUser.likes);
  const handleUnlike = async (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    const updatedUser = { ...profile, likes: updatedPosts };
    await dispatch(updateUserThunk(updatedUser));
    setPosts(updatedPosts);
    setProfile(updatedUser);
    // logic to decrease like of post by 1
    // change HTML shown below
  };

  return (
    <Text>
      <div className="container">
        <div className="row">
          {posts.map((post) => (
            <div className="col-md-6" key={post._id}>
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">Post Title</h5>
                  <p className="card-text">Post Content</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleUnlike(post._id)}
                  >
                    Remove Like
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Text>
  );
}

export default ProfileLikes;
