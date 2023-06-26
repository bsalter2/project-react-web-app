import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAllRecipesLikedThunk } from "../services/recipes-thunk";
import { useNavigate } from "react-router";

function ProfileLikes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.currentUser);
  const { recipes } = useSelector((state) => state.recipes);
  const [likedRecipes, setLikedRecipes] = useState(recipes);
  const [likes, setLikes] = useState([]);

  const handleNavigate = (recipeId) => {
    navigate(`/details/${recipeId}`);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      const { payload } = await dispatch(findAllRecipesLikedThunk());
      if (payload) {
        const updatedLikes = currentUser.likes.map((like) => {
          const recipe = payload.find((recipe) => recipe.recipeId === like);
          return {
            recipeId: like,
            recipeTitle: recipe ? recipe.name : "",
          };
        });
        setLikes(updatedLikes);
      }
    };
    fetchRecipes();
  }, [dispatch, currentUser.likes]);

  return (
    <div className="container">
      <div className="row">
        {likes.map((like) => (
          <div className="col-md-6" key={like.recipeId}>
            <div
              className="card mb-3"
              onClick={() => handleNavigate(like.recipeId)}
            >
              <div className="card-body">
                <h5 className="card-title">{like.recipeTitle}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileLikes;
