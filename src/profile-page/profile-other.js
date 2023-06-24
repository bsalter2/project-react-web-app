import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  getUserByUsernameThunk,
  updateUserThunk,
  getOtherUserByIDThunk,
} from "../services/users-thunk";
import { profileThunk } from "../services/auth-thunk";

const Text = styled.p`
  text-align: left;
  color: white;
  font-family: "Roboto", sans-serif;
`;

function ProfileScreenPublic() {
  const { currentUser } = useSelector((state) => state.currentUser);
  const [profile, setProfile] = useState(currentUser);
  const dispatch = useDispatch();
  const params = useParams();
  const username = params.username;
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const { payload } = await dispatch(getUserByUsernameThunk(username));
      setUser(payload);
    };
    const loadProfile = async () => {
      const { payload } = await dispatch(profileThunk());
      setProfile(payload);
    };
    loadProfile();
    fetchUser();
  }, [dispatch, params, username]);

  const handleFollow = async () => {
    const updatedFollowings = [...profile.followings, user._id];
    const updatedUser = { ...profile, followings: updatedFollowings };
    setProfile(updatedUser);
    await dispatch(updateUserThunk(updatedUser));
    const updatedFollowedUserFollowers = [...user.followers, profile._id];
    const updatedFollowedUser = {
      ...user,
      followers: updatedFollowedUserFollowers,
    };
    setUser(updatedFollowedUser);
    await dispatch(updateUserThunk(updatedFollowedUser));
  };

  const handleUnfollow = async () => {
    const updatedFollowings = profile.followings.filter(
      (following) => following !== user._id
    );
    const updatedUser = { ...profile, followings: updatedFollowings };
    setProfile(updatedUser)
    await dispatch(updateUserThunk(updatedUser));
    const updatedFollowedUserFollowers = user.followers.filter(
      (follower) => follower !== profile._id
    );
    const updatedFollowedUser = {
      ...user,
      followers: updatedFollowedUserFollowers,
    };
    setUser(updatedFollowedUser);
    await dispatch(updateUserThunk(updatedFollowedUser));
  };

  return (
    <Text>
      {!user && <div>User Does Not Exist</div>}
      {user && (
        <div className="container">
          {profile && profile.username !== user.username && (
            <div className="row">
              {!profile.followings.some((u) => u === user._id) && (
                <button className="col-4" onClick={handleFollow}>
                  Follow
                </button>
              )}
              {profile.followings.some((u) => u === user._id) && (
                <button className="col-4" onClick={handleUnfollow}>
                  Unfollow
                </button>
              )}
            </div>
          )}

          <div className="row">
            <label className="col-5">Name</label>
            <label className="col-7">
              {user.firstName} {user.lastName}
            </label>
            <label className="col-5">Username</label>
            <label className="col-7">{user.username}</label>
          </div>
          <br></br>
          <div className="row">
            <div className="col-4 d-flex justify-content-center">
              <label>
                Followers: {user.followers ? user.followers.length : 0}
              </label>
            </div>
            <div className="col-4 d-flex justify-content-center">
              <label>
                Following: {user.followings ? user.followings.length : 0}
              </label>
            </div>
            <div className="col-4 d-flex justify-content-center">
              <label>Likes: {user.likes ? user.likes.length : 0}</label>
            </div>
          </div>
        </div>
      )}
    </Text>
  );
}
export default ProfileScreenPublic;