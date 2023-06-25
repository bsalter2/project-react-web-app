import React, { useEffect, useState } from "react";
import RecipeItem from "./recipe-details";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findRecipesByIdThunk } from "../services/recipes-thunk";

function DetailsScreen() {
  const params = useParams();
  const id = params.did;
  const { recipe, loading } = useSelector((state) => state.single_recipe);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findRecipesByIdThunk(id));
  }, []);

  return (
    <>
      {loading ? (
        <li className="list-group-item">Loading...</li>
      ) : (
        <RecipeItem key={recipe._id} recipe={recipe} />
      )}
    </>
  );
}

export default DetailsScreen;
