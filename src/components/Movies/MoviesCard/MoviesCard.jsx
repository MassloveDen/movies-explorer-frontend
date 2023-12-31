import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import './MoviesCard.css';
import { converter } from '../../../utils/helpers';

function MoviesCard({ movie, onCardSave, savedCards, handleDeleteCard }) {
	const { pathname } = useLocation()
	const [isLiked, setIsLiked] = React.useState(false);

	useEffect(() => {
		setIsLiked(savedCards.some((card) => {
			return card.movieId === movie.id
		}));
	}, [savedCards, pathname]);

	function handleSaveClick() {
		if (isLiked) {
			const id = savedCards.filter((card) => {
				if (card.nameRU === movie.nameRU) {
				}

				return card.nameRU === movie.nameRU;
			})[0]._id;
			handleDeleteCard(id);
		} else {
			onCardSave(movie);
		}
		isLiked ? setIsLiked(false) : setIsLiked(true);
	}

	return (
		<div className='card'>
			<a
				href={movie.trailerLink}
				target='_blank'
				rel='noreferrer'
				className='card__link'
			>
				<img
					className='card__item'
					alt={movie.nameRU}
					src={'https://api.nomoreparties.co/' + movie.image.url}
				/>
			</a>
			<div className='card__context'>
				<div className='card__container'>
					<h2 className='card__title'>{movie.nameRU}</h2>
					<p className='card__duration'>{converter(movie.duration)}</p>
				</div>
				<button
					type='button'
					className={`card__like-button ${isLiked ? 'card__like-button_active' : ''}`}
					onClick={handleSaveClick}
				>Сохранить</button>
			</div>
		</div>
	);
}
export default MoviesCard;
