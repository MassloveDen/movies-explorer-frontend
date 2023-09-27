import React from 'react';
import './MoviesCard.css';
import { converter } from '../../../utils/helpers';

function MoviesCard({ movie, onCardDelete }) {
  function handleDeleteClick() {
    onCardDelete(movie._id);
  }
  return (
    <div className='card'>
      <img className='card__item' alt={movie.nameRU} src={movie.image} />
      <button
          type='button'
          className='card__button-remove'
          onClick={handleDeleteClick}
      ></button>
      <div className='card__context'>
        <div className='card__container'>
          <h2 className='card__title'>{movie.nameRU}</h2>
          <p className='card__duration'>{converter(movie.duration)}</p>
        </div>
      </div>
    </div>
  );
}
export default MoviesCard;
