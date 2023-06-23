import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOtherUserByIDThunk } from "../services/users-thunk";

function ProfileScreenPublic() {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.uid;
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await dispatch(getOtherUserByIDThunk(id));
      setUser(userData);
    };
    fetchUser();
  }, [dispatch, id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <label>Name</label>
        <label>
          {user.firstName} {user.lastName}
        </label>
        <label>Username</label>
        <label>{user.userName}</label>
      </div>
      <div className="row">
        <div className="col-4" onClick={handleFollowersClick}>
          <label>Followers: {user.followers.length}</label>
        </div>
        <div className="col-4" onClick={handleFollowingClick}>
          <label>Following: {user.following.length}</label>
        </div>
        <div className="col-4" onClick={handleLikesClick}>
          <label>Likes: {user.likes.length}</label>
        </div>
      </div>
    </div>
  );
}
export default ProfileScreenPublic;
// make data of user so that email/phone/followers/following/likes are initialized
// will we be able to search by user?
