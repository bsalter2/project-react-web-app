import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserThunk } from "../services/users-thunk";

function ProfileFollowing() {
  const dispatch = useDispatch();
  const { followings } = useSelector((state) => state.currentUser.followings);

  const handleUnfollow = async (followingID) => {
    const updatedFollowings = followings.filter(
      (following) => following.id !== followingID
    );
    const updatedUser = { ...currentUser, followings: updatedFollowings };
    dispatch(updateUserThunk(updatedUser));
    const followedUser = await dispatch(getUserByIDThunk(followingID));
    const updatedFollowedUserFollowers = followedUser.followers.filter(
      (follower) => follower.id !== currentUser.id
    );
    const updatedFollowedUser = {
      ...followedUser,
      followers: updatedFollowedUserFollowers,
    };
    await dispatch(updateUserThunk(updatedFollowedUser));
  };

  return (
    <div className="container">
      {followings.map((following) => (
        <div className="row" key={following.id}>
          <div className="col">{following.userName}</div>
          <button
            className="btn btn danger col"
            onClick={() => handleUnfollow(following.id)}
          >
            Unfollow
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProfileFollowing;
