import React, {useState, useEffect} from "react";
import RecipeSummaryList from './recipe-summary-list'
import { useDispatch, useSelector } from "react-redux";
import { findRecipesByStringThunk, findAllRecipesThunk } from "../services/recipes-thunk";


function SearchScreen() {
    const { recipes, loading } = useSelector(state => state.recipes)
    const [search, setSearch] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findAllRecipesThunk())
    }, [])

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
          event.preventDefault();
          dispatch(findRecipesByStringThunk(search))
        }
    }
    
    return (
            <div className='container'>
                <div className="row">
                    <div className="col-11 position-relative">
                        <input type="text" placeholder="Search Recipe"
                            className="form-control rounded-pill ps-5" onChange={event => setSearch(event.target.value)} value={search}
                            onKeyDown={handleKeyDown}/>
                    </div>
                    <div className="col-1">

                    </div>
                </div>

                <RecipeSummaryList recipes={recipes} />
            </div>

    )
}

export default SearchScreen