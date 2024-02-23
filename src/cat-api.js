import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_8lK64WZbVCzuiQC9QX7Dd4n9uF3h6SO8cuEp7WCjRHti6us5EUKfIVibhslOlmjk';

const loader = document.querySelector('.loader');
const errorElement = document.querySelector('.error');
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

export function fetchBreeds() {
  loader.style.display = 'block';
  errorElement.style.display = 'none';

  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      const breeds = response.data;

      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });

      breedSelect.style.display = 'block';
      loader.style.display = 'none';

      return breeds;
    })
    .catch(error => {
      errorElement.style.display = 'block';
      loader.style.display = 'none';
      console.error('Error fetching breeds:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  loader.style.display = 'block';
  catInfo.style.display = 'none';
  errorElement.style.display = 'none';

  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      const catData = response.data[0];

      const catImage = document.createElement('img');
      catImage.src = catData.url;
      catImage.alt = catData.breeds[0].name;

      catInfo.innerHTML = '';
      catInfo.appendChild(catImage);
      catInfo.insertAdjacentHTML(
        'beforeend',
        `<p>Name: ${catData.breeds[0].name}</p>`
      );
      catInfo.insertAdjacentHTML(
        'beforeend',
        `<p>Description: ${catData.breeds[0].description}</p>`
      );
      catInfo.insertAdjacentHTML(
        'beforeend',
        `<p>Temperament: ${catData.breeds[0].temperament}</p>`
      );

      loader.style.display = 'none';
      catInfo.style.display = 'block';

      return catData;
    })
    .catch(error => {
      loader.style.display = 'none';
      errorElement.style.display = 'block';
      console.error('Error fetching cat by breed:', error);
      throw error;
    });
}
