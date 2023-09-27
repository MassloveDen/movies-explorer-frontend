import React from 'react';
import './FilterCheckbox.css';
import { setToLocalStorage } from '../../../utils/helpers';
function FilterCheckbox({ movieFilter, setMovieFilter, addMovies, query }) {
	async function handleButtonClick() {
      setToLocalStorage('checkedButton', !movieFilter)
      setMovieFilter(!movieFilter)
      addMovies(query)
	}

	return (
		<div className='filter'>
			<input
				className='filter__input'
				type='checkbox'
				id='checkbox'
				onChange={handleButtonClick}
				checked={movieFilter}
			/>
			<label className='filter__label' />
		</div>
	);
}

export default FilterCheckbox;