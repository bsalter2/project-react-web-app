import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  updateUserThunk,
  getOtherUserByIDThunk,
} from "../services/users-thunk";
import { profileThunk } from "../services/auth-thunk";

const Text = styled.p`
  text-align: left;
  color: white;
  font-family: "Roboto", sans-serif;
`;

function ProfileFollowing() {
  const { currentUser } = useSelector((state) => state.currentUser);
  const [profile, setProfile] = useState(currentUser);
  const [followingUsers, setFollowingUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProfile = async () => {
      const { payload } = await dispatch(profileThunk());
      setProfile(payload);
    };
    loadProfile();
  }, [dispatch]);

  useEffect(() => {
    const fetchFollowingUsers = async () => {
      const users = await Promise.all(
        profile.followings.map(async (followingId) => {
          const { payload } = await dispatch(
            getOtherUserByIDThunk(followingId)
          );
          return payload;
        })
      );
      setFollowingUsers(users);
    };
    if (profile.followings) {
      fetchFollowingUsers();
    }
  }, [profile.followings]);

  const handleUnfollow = async (id) => {
    if (profile.followings) {
      const updatedFollowings = profile.followings.filter(
        (following) => following !== id
      );
      const updatedUser = { ...profile, followings: updatedFollowings };
      setProfile(updatedUser);
      await dispatch(updateUserThunk(updatedUser));
    }
    const { payload } = await dispatch(getOtherUserByIDThunk(id));
    if (payload.followers) {
      const followedUserFollowers = payload.followers.filter(
        (follower) => follower !== profile._id
      );
      const updatedFollowedUser = {
        ...payload,
        followers: followedUserFollowers,
      };
      await dispatch(updateUserThunk(updatedFollowedUser));
    }
  };

  return (
    <Text>
      <div>
        {followingUsers.length > 0 && (
          <div className="container">
            {followingUsers.map((followingUser) => (
              <div className="row" key={followingUser._id}>
                <div className="col-4">{followingUser.username}</div>
                <div className="col-5">
                  {followingUser.firstName} {followingUser.lastName}{" "}
                </div>
                <button
                  className="btn btn-light col-3"
                  onClick={() => handleUnfollow(followingUser._id)}
                >
                  Unfollow
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Text>
  );
}

export default ProfileFollowing;
