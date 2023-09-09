import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { moviesApi } from '../../utils/MoviesApi';
import { setToLocalStorage } from '../../utils/helpers';
import {
	MOVIE_ADD_THREE,
	MOVIE_SCREEN_EIGHT,
	MOVIE_SCREEN_LARGE,
	MOVIE_SCREEN_MEDIUM,
	MOVIE_SCREEN_MOBILE,
	MOVIE_SCREEN_TWELVE,
} from '../../utils/constants';
import { useWindowSize } from '../../hooks/useWindowSize';

function Movies({
	loggedIn,
	onCardSave,
	savedCards,
	cardList,
	setCardList,
	handleDeleteCard,
	movieFilter,
	setMovieFilter,
	isCardsLoading,
	setIsCardsLoading,
}) {
	const [addMoviesButton, setAddMovieButton] = React.useState(0);
	const [isActiveButton, setIsActiveButton] = React.useState(
		cardList.length <= addMoviesButton
	);
	const [isFind, setIsFind] = React.useState(false);
	const { width } = useWindowSize();


	function qtyOfMoviesCard() {
		if (width > MOVIE_SCREEN_LARGE) {
			return setAddMovieButton(MOVIE_SCREEN_TWELVE);
		}
		if (width > MOVIE_SCREEN_MEDIUM && width < MOVIE_SCREEN_LARGE) {
			return setAddMovieButton(MOVIE_SCREEN_EIGHT);
		}
		if (width < MOVIE_SCREEN_MOBILE) {
			return setAddMovieButton(MOVIE_ADD_THREE);
		}
	}

	function handleAddButton() {
		if (width > MOVIE_SCREEN_LARGE) {
			return setAddMovieButton((prev) => prev + 3);
		} else {
			return setAddMovieButton((prev) => prev + 2);
		}
	}

	React.useEffect(() => {
		qtyOfMoviesCard();
	}, [width]);

	function addMovies(query) {
		setIsCardsLoading(true);
		moviesApi.getInfo().then((movieResult) => {
			const resultMoviesFilter = moviesFilter(query, movieResult);
			setCardList(resultMoviesFilter);
			setToLocalStorage('mineMovies', resultMoviesFilter);
			setToLocalStorage('querySearch', query);
			resultMoviesFilter.length === 0 ? setIsFind(true) : setIsFind(false);
			setIsActiveButton(resultMoviesFilter.length <= addMoviesButton);
			setIsCardsLoading(false);
		});
	}

	function moviesFilter(query, cardList) {
		const filteredList = cardList.filter(
			(movie) =>
				movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
				movie.nameEN.toLowerCase().includes(query.toLowerCase())
		);
		return filteredList;
	}

	const isAddMore = !isActiveButton && cardList.length > addMoviesButton && !movieFilter;

	return (
		<>
			<Header loggedIn={loggedIn} />
			<main className='movies'>
				<SearchForm
					cardList={cardList}
					addMovies={addMovies}
					movieFilter={movieFilter}
					setMovieFilter={setMovieFilter}
					setIsFind={setIsFind}
				/>
				<MoviesCardList
					movies={cardList}
					addMoviesButton={addMoviesButton}
					setAddMovieButton={setAddMovieButton}
					onCardSave={onCardSave}
					savedCards={savedCards}
					handleDeleteCard={handleDeleteCard}
					movieFilter={movieFilter}
					isCardsLoading={isCardsLoading}
					isActiveButton={isActiveButton}
					qtyOfMoviesCard={qtyOfMoviesCard}
				/>
				{isFind && <span className='movies__no-movies'>«Ничего не найдено»</span>}
				{isAddMore && (
					<button
						className='movies__button'
						onClick={handleAddButton}
					>
						Ещё
					</button>
				)}
			</main>
			<Footer />
		</>
	);
}

export default Movies;
