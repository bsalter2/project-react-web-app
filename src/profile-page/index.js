import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { profileThunk, logoutThunk } from "../services/auth-thunk";
import { updateUserThunk } from "../services/users-thunk";
function ProfileScreen() {
  const { currentUser } = useSelector((state) => state.currentUser);
  const [profile, setProfile] = useState(currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const save = async () => {
    await dispatch(updateUserThunk(profile));
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
  }, []);
  return (
    <div>
      {profile && (
        <div className="container">
          <div className="row">
            <label>First Name</label>
            <input
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
            <label>Last Name</label>
            <input
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
          <button className="btn btn success row" onClick={save}>
            Save{" "}
          </button>
          <div className="row">
            <label>Phone Number: {profile.phoneNumber}</label>
          </div>
          <div className="row">
            <label>Email: {profile.email}</label>
          </div>
          <div className="row">
            <div className="col-4" onClick={handleFollowersClick}>
              <label>Followers: {profile.followers.length}</label>
            </div>
            <div className="col-4" onClick={handleFollowingClick}>
              <label>Following: {profile.following.length}</label>
            </div>
            <div className="col-4" onClick={handleLikesClick}>
              <label>Likes: {profile.likes.length}</label>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => {
          dispatch(logoutThunk());
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
export default ProfileScreen;

// make data of user so that email/phone/followers/following/likes are initialized

// profile/{uid} for other users
// has follow button toggle on and off
// make profile different for when user is current user
