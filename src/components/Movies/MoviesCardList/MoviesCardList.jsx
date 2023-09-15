import React, { useEffect } from "react"
import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard"
import Preloader from "../../Preloader/Preloader"

function MoviesCardList({
	movies,
	addMoviesButton,
	onCardSave,
	savedCards,
	handleDeleteCard,
	isCardsLoading,
	qtyOfMoviesCard,
}) {
	useEffect(() => {
    qtyOfMoviesCard()
  }, [movies])

	return (
		<>
			{isCardsLoading ? (
				<Preloader />
			) : (
				<section className='cardlist'>
					<ul className='cardlist__list'>
						{movies.slice(0, addMoviesButton).map((film) => (
							<MoviesCard
								movie={film}
								movies={movies}
								onCardSave={onCardSave}
								savedCards={savedCards}
								handleDeleteCard={handleDeleteCard}
								key={film.id}
							/>
						))}
					</ul>
				</section>
			)}
		</>
	);
}

export default MoviesCardList
