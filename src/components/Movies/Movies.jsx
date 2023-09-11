import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { moviesApi } from '../../utils/MoviesApi';
import { getFromLocalStorage, setToLocalStorage } from '../../utils/helpers';
import {
	MOVIE_ADD_THREE,
	MOVIE_SCREEN_EIGHT,
	MOVIE_SCREEN_LARGE,
	MOVIE_SHORT,
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
	films,
	setFilms,
	setCardList,
	handleDeleteCard,
	movieFilter,
	setMovieFilter,
	isCardsLoading,
	setIsCardsLoading,
}) {
	const [addMoviesButton, setAddMovieButton] = React.useState(0);
	const [isActiveButton, setIsActiveButton] = React.useState(false);
	
	const [isFind, setIsFind] = React.useState(false);
	const { width } = useWindowSize();

	function qtyOfMoviesCard() {
		if (width >= MOVIE_SCREEN_LARGE) {
			return setAddMovieButton(12);
		}
		if (width > 768 && width < MOVIE_SCREEN_LARGE) {
			return setAddMovieButton(8);
		}
		if (width < MOVIE_SCREEN_MOBILE) {
			return setAddMovieButton(5);
		}
	}

	function handleAddButton() {
		if (width >= MOVIE_SCREEN_LARGE) {
			return setAddMovieButton((prev) => prev + 3);
		} else {
			return setAddMovieButton((prev) => prev + 2);
		}
	}


	function addMovies(query) {
		if (query === null) {
			setIsCardsLoading(false);
			return;
		}
		const getFromLocal = getFromLocalStorage('checkedButton');
		setIsCardsLoading(true);
		if (films.length == 0) {
			moviesApi.getInfo().then((allMovies) => {
				setFilms(allMovies);
				setToLocalStorage('films', allMovies);
				const filteredMovies = moviesFilter(query, allMovies);
				const shortOrLongMovies = getFromLocal
					? filteredMovies.filter((film) => film.duration < MOVIE_SHORT)
					: filteredMovies;
				setCardList(shortOrLongMovies);
				setToLocalStorage('mineMovies', shortOrLongMovies);
			});
		} else {
			const filteredMovies = moviesFilter(query, films);
			const shortOrLongMovies = getFromLocal
			? filteredMovies.filter((film) => film.duration < MOVIE_SHORT)
			: filteredMovies;
			setCardList(shortOrLongMovies);
			setToLocalStorage('mineMovies', shortOrLongMovies);
		}
		setIsCardsLoading(false);
	}

	function moviesFilter(query, cardList) {
		const filteredList = cardList.filter(
			(movie) =>
				movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
				movie.nameEN.toLowerCase().includes(query.toLowerCase())
		);
		return filteredList;
	}
	React.useEffect(() => {
		qtyOfMoviesCard()
	}, [width])
	React.useEffect(() => {
		if (addMoviesButton < cardList.length) {
			setIsActiveButton(true)
		}
		if(addMoviesButton >= cardList.length) {
			setIsActiveButton(false)
		}
	}, [cardList, addMoviesButton])


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
				{isActiveButton && (
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
