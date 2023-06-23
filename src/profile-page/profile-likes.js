import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserThunk } from "../services/users-thunk";

function ProfileLikes() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.currentUser);
  const handleUnlike = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    const updatedUser = { ...currentUser, likes: updatedPosts };
    dispatch(updateUserThunk(updatedUser));
    // need logic to change like count of post
  };

  const { posts } = currentUser.likes;
  return (
    <div className="container">
      <div className="row">
        {posts.map((post) => (
          <div className="col-md-6" key={post.id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Post Title</h5>
                <p className="card-text">Post Content</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleUnlike(post.id)}
                >
                  Remove Like
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileLikes;
