import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { profileThunk, logoutThunk } from "../services/auth-thunk";
import styled from "styled-components";
import { updateUserThunk } from "../services/users-thunk";

const Text = styled.p`
  text-align: left;
  color: white;
  font-family: "Roboto", sans-serif;
`;

function ProfileScreen() {
  const { currentUser } = useSelector((state) => state.currentUser);
  const [profile, setProfile] = useState(currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const save = async () => {
    await dispatch(updateUserThunk(profile));
    const { payload } = await dispatch(profileThunk());
    setProfile(payload);
  };

  const handleFollowersClick = () => {
    navigate("/profile/followers");
  };

  const handleFollowingClick = () => {
    navigate("/profile/following");
  };

  const handleLikesClick = () => {
    navigate("/profile/likes");
  };

  useEffect(() => {
    const loadProfile = async () => {
      const { payload } = await dispatch(profileThunk());
      setProfile(payload);
    };
    loadProfile();
  }, [dispatch]);

  return (
    <Text>
      <div>
        {profile && (
          <div className="container">
            <div className="row">
              <label className="col-6">First Name</label>
              <input
                className="col-6"
                type="text"
                value={profile.firstName}
                onChange={(event) => {
                  const newProfile = {
                    ...profile,
                    firstName: event.target.value,
                  };
                  setProfile(newProfile);
                }}
              />
            </div>
            <div className="row">
              <label className="col-6">Last Name</label>
              <input
                className="col-6"
                type="text"
                value={profile.lastName}
                onChange={(event) => {
                  const newProfile = {
                    ...profile,
                    lastName: event.target.value,
                  };
                  setProfile(newProfile);
                }}
              />
            </div>
            <div className="row">
              <label className="col-6">Phone Number</label>
              <input
                className="col-6"
                type="text"
                value={profile.phoneNumber}
                onChange={(event) => {
                  const newProfile = {
                    ...profile,
                    phoneNumber: event.target.value,
                  };
                  setProfile(newProfile);
                }}
              />
            </div>
            <div className="row">
              <label className="col-6">Email</label>
              <input
                className="col-6"
                type="text"
                value={profile.email}
                onChange={(event) => {
                  const newProfile = {
                    ...profile,
                    email: event.target.value,
                  };
                  setProfile(newProfile);
                }}
              />
            </div>
            <div className="row">
              <button className="btn btn-light col-2" onClick={save}>
                Update
              </button>
            </div>
            <br></br>
            <div className="row">
              <div
                className="col-4 d-flex justify-content-center"
                onClick={
                  profile.followers.length !== 0 ? handleFollowersClick : null
                }
              >
                <label>
                  Followers: {profile.followers ? profile.followers.length : 0}
                </label>
              </div>
              <div
                className="col-4 d-flex justify-content-center"
                onClick={
                  profile.followings.length !== 0 ? handleFollowingClick : null
                }
              >
                <label>
                  Following:{" "}
                  {profile.followings ? profile.followings.length : 0}
                </label>
              </div>
              <div
                className="col-4 d-flex justify-content-center"
                onClick={profile.likes && profile.likes.length ? handleLikesClick : null}
              >
                <label>Likes: {profile.likes ? profile.likes.length : 0}</label>
              </div>
            </div>
            <br></br>
            {profile.role === "influencer" && (
              <div className="row">
                <label className="col-6">Bio</label>
                <div className="row">
                  <input
                    className="col-12"
                    type="text"
                    value={profile.bio}
                    onChange={(event) => {
                      const newProfile = {
                        ...profile,
                        bio: event.target.value,
                      };
                      setProfile(newProfile);
                    }}
                  />
                </div>
              </div>
            )}
            <br></br>
            <div className="row">
              <button
                className="btn btn-light col-3"
                onClick={() => {
                  dispatch(logoutThunk());
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </Text>
  );
}
export default ProfileScreen;
