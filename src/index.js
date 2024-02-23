import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  const catInfo = document.querySelector('.cat-info');
  const loader = document.querySelector('.loader');
  const errorElement = document.querySelector('.error');

  breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;

    fetchCatByBreed(selectedBreedId);
  });

  fetchBreeds()
    .then(() => {
      breedSelect.style.display = 'block';
    })
    .catch(error => {
      console.error('Error loading breeds:', error);
    });
});
