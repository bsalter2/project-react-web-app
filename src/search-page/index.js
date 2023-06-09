import React from 'react'
import RecipeSummaryList from './recipe-summary-list'

function SearchScreen() {
  return (
    <div className='container'> 
    <div className="row">
      <div className="col-11 position-relative">
        <input placeholder="Search Recipe"
               className="form-control rounded-pill ps-5"/>
      </div>
      <div className="col-1">

      </div>
    </div>

    <RecipeSummaryList/>
  </div>
  )
}

export default SearchScreen