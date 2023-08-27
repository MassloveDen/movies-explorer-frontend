import React from 'react';
import './AboutMe.css';
import mine from '../../../images/mine.jpg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <section className='student' id='about-me'>
      <h2 className='student__title'>Студент</h2>
      <div className='student__container'>
        <div className='student__content-container'>
          <h3 className='student__title-container'>Денис</h3>
          <p className='student__profession-container'>
            Разработчик.
          </p>
          <p className='student__description-container'>
            Занимаюсь кодингом.
          </p>
          <a
            href='https://github.com/MassloveDen'
            className='student__github-container'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
        <div className='student__photo-container'>
          <img className='student__mine-container' src={mine} alt='Мое фото' />
        </div>
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;
