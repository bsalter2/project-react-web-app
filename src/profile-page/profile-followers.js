import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserThunk, getUserByIDThunk } from "../services/users-thunk";

function ProfileFollowers() {
  const dispatch = useDispatch();
  const { followers } = useSelector((state) => state.currentUser.followers);

  const handleUnfollow = async (followerID) => {
    const updatedFollowers = followers.filter(
      (follower) => follower.id !== followerID
    );
    const updatedUser = { ...currentUser, followers: updatedFollowers };
    await dispatch(updateUserThunk(updatedUser));

    const followingUser = await dispatch(getUserByIDThunk(followerID));
    const updatedFollowingUserFollowings = followingUser.followings.filter(
      (following) => following.id !== currentUser.id
    );
    const updatedFollowingUser = {
      ...followingUser,
      followings: updatedFollowingUserFollowings,
    };
    await dispatch(updateUserThunk(updatedFollowingUser));
  };

  return (
    <div className="container">
      {followers.map((follower) => (
        <div className="row" key={follower.id}>
          <div className="col">{follower.userName}</div>
          <button
            className="btn btn danger col"
            onClick={() => handleUnfollow(follower.id)}
          >
            Unfollow
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProfileFollowers;
