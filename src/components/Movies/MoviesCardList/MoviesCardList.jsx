import React, { useEffect } from "react"
import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard"
import { MOVIE_SHORT } from "../../../utils/constants"
import Preloader from "../../Preloader/Preloader"

function MoviesCardList({
  movies,
  addMoviesButton,
  onCardSave,
  savedCards,
  handleDeleteCard,
  movieFilter,
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
            {movieFilter
              ? movies
                  .filter((movie) => {
                    return movie.duration < MOVIE_SHORT
                  })
                  .slice(0)
                  .map((movie) => (
                    <MoviesCard
                      movie={movie}
                      movies={movies}
                      onCardSave={onCardSave}
                      savedCards={savedCards}
                      handleDeleteCard={handleDeleteCard}
                      key={movie.id}
                    />
                  ))
              : movies
                  .slice(0, addMoviesButton)
                  .map((movie) => (
                    <MoviesCard
                      movie={movie}
                      movies={movies}
                      onCardSave={onCardSave}
                      savedCards={savedCards}
                      handleDeleteCard={handleDeleteCard}
                      key={movie.id}
                    />
                  ))}
          </ul>
        </section>
      )}
    </>
  )
}

export default MoviesCardList
