import React, {useState, useEffect} from "react";
import styled from 'styled-components';
import RecipeSummaryList from './recipe-summary-list'
import { useDispatch, useSelector } from "react-redux";
import { findRecipesByStringThunk, findAllRecipesThunk } from "../services/recipes-thunk";
import { useNavigate, useParams} from 'react-router-dom';

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #1DA1F2;
  border-radius: 50px;
  overflow: hidden;
  width: 100%;
  margin-top: 10px;
`;

const SearchInput = styled.input`
  width: 85%;
  height: 40px;
  border: none;
  padding: 10px 40px;
  font-size: 16px;
  color: #657786;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #1DA1F2;
  }
  &::placeholder {
    color: #657786;
  }
`;

const SearchButton = styled.button`
  width: 15%;
  height: 40px;
  border: none;
  background-color: #1DA1F2;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

function SearchScreen() {
    const { recipes, loading } = useSelector(state => state.recipes)
    const {sc} = useParams()
    const navigate = useNavigate()
    const [search, setSearch] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!sc) {
            dispatch(findAllRecipesThunk())
        }
        else {
            dispatch(findRecipesByStringThunk(sc))
        }
    }, [])

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
          event.preventDefault();
          searchRecipes()
        }
    }

    const searchRecipes = () => {
        navigate(`/search/${search}`);
        dispatch(findRecipesByStringThunk(search))
    }
    
    return (
        <div className='container'>
            <div className="row">
                <div className="col-11 position-relative">
                    <SearchContainer>
                        <SearchInput 
                            type="text" 
                            placeholder="Search Recipe" 
                            onChange={event => setSearch(event.target.value)} 
                            value={search}
                            onKeyDown={handleKeyDown} 
                        />
                        <SearchButton onClick={searchRecipes}>
                            Search
                        </SearchButton>
                    </SearchContainer>
                </div>
                <div className="col-1">

                </div>
            </div>

            <RecipeSummaryList recipes={recipes} />
        </div>

    )
}

export default SearchScreen

