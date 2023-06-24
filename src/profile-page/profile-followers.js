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

function ProfileFollower() {
  const { currentUser } = useSelector((state) => state.currentUser);
  const [profile, setProfile] = useState(currentUser);
  const [followers, setFollowers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProfile = async () => {
      const { payload } = await dispatch(profileThunk());
      setProfile(payload);
    };
    loadProfile();
  }, [dispatch]);

  useEffect(() => {
    const fetchFollowers = async () => {
      const users = await Promise.all(
        profile.followers.map(async (followerId) => {
          const { payload } = await dispatch(
            getOtherUserByIDThunk(followerId)
          );
          return payload;
        })
      );
      setFollowers(users);
    };
    if (profile.followers) {
      fetchFollowers();
    }
  }, [profile.followers]);

  const handleUnfollow = async (id) => {
    if (profile.followers) {
      const updatedFollowers = profile.followers.filter(
        (follower) => follower !== id
      );
      const updatedUser = { ...profile, followers: updatedFollowers };
      setProfile(updatedUser);
      await dispatch(updateUserThunk(updatedUser));
    }
    const { payload } = await dispatch(getOtherUserByIDThunk(id));
    if (payload.followings) {
      const followedUserFollowings = payload.followings.filter(
        (following) => following !== profile._id
      );
      const updatedFollowingUser = {
        ...payload,
        followings: followedUserFollowings,
      };
      await dispatch(updateUserThunk(updatedFollowingUser));
    }
  };

  return (
    <Text>
      <div>
        {followers.length > 0 && (
          <div className="container">
            {followers.map((follower) => (
              <div className="row" key={follower._id}>
                <div className="col-4">{follower.username}</div>
                <div className="col-5">
                  {follower.firstName} {follower.lastName}
                </div>
                <button
                  className="btn btn-light col-3"
                  onClick={() => handleUnfollow(follower._id)}
                >
                  Remove Follower
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Text>
  );
}

export default ProfileFollower;
