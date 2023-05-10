export async function renderModal(movie) {
  const {
    poster_path,
    original_title,
    vote_average,
    vote_count,
    popularity,
    genres,
    overview,
  } = await movie;
  const genreName = genres.map(genre => genre.name);
  const genresList = genreName.slice(0, 2);
  const modalMarkup = `
    <div class="modal-weekly__thumb">
      <img src="https://image.tmdb.org/t/p/original/${poster_path}" alt=${original_title} class="modal-weekly__img">
    </div>
    <div class="modal-weekly__info">
      <h2 class="modal-weekly__title">${original_title}</h2>
      <ul class="modal-weekly__list">
      <li class="modal-weekly__list-item"><p class="modal-weekly__list-vote">Vote / Votes</p><span class="modal-weekly__list-values"><span class="modal-weekly__list-evalue">${vote_average}</span><span class="modal-weekly__list-sign"> / </span><span class="modal-weekly__list-evalue">${vote_count}</span></span></li>
      <li class="modal-weekly__list-item"><p class="modal-weekly__list-popularity">Popularity</p><span class="modal-weekly__list-count">${popularity}</span></li>
      <li class="modal-weekly__list-item"><p class="modal-weekly__list-genre">Genre</p><span class="modal-weekly__list-genres">${genresList}</span></li>
      </ul>
      <strong class="modal-weekly__about">About</strong>
      <p class="modal-weekly__description">${overview}</p>
      <button type="button" class="button-send">Add to my library</button>
    </div>`;
  modalPoster.insertAdjacentHTML('beforeend', modalMarkup);

  setTimeout(() => {
    const closeButton = document.querySelector('.close');
    const addButton = document.querySelector('.button-send');
    addButton.addEventListener('click', () => {
      addToLibrary(movie);
    });
  }, 0);
}
