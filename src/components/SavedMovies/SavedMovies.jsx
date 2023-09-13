import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SavedMovies/SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList.jsx';
import Footer from '../Footer/Footer';
import SavedDevider from './SavedDevider/SavedDevider';
import { getFromLocalStorage, setToLocalStorage } from '../../utils/helpers';
import { mainApi } from '../../utils/MainApi';

function SavedMovies({
	loggedIn,
	onCardDelete,
	savedMovies,
	setSavedMovies,
	movieFilter,
	setMovieFilter,
	setIsCardsLoading,
}) {
	React.useEffect(() => {
		const jwt = getFromLocalStorage('jwt');
		mainApi
			.getSavedCard(jwt)
			.then((data) => {
				setSavedMovies(data);
				setToLocalStorage('mineSavedMovies', data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	function addMovies(query) {
		setIsCardsLoading(true);

		setSavedMovies((prev) =>
			prev.filter((movie) => 
      movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(query.toLowerCase()))
      
		);
		setIsCardsLoading(false);
	}

	return (
		<>
			<Header loggedIn={loggedIn} />
			<main className='movies'>
				<SearchForm
					addMovies={addMovies}
					movieFilter={movieFilter}
					setMovieFilter={setMovieFilter}
				/>
				<MoviesCardList
					movies={savedMovies}
					onCardDelete={onCardDelete}
					movieFilter={movieFilter}
				/>
				<SavedDevider />
			</main>
			<Footer />
		</>
	);
}

export default SavedMovies;
