import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ addMovies, movieFilter, setSavedMovieFilter, query }) {
  function handleButtonClick(e) {
    setSavedMovieFilter(e.target.checked);
    if (addMovies) {
      addMovies(query ? query: '')
    }
  }

  return (
    <div className='filter'>
      <input
        className='filter__input'
        type='checkbox'
        id='checkbox'
        onChange={handleButtonClick}
        checked={movieFilter}
        defaultChecked={false}
      />
      <label className='filter__label' />
    </div>
  );
}

export default FilterCheckbox;