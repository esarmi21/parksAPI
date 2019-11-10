'use strict';

const apiKey = "ra6fIL02d9VRTRnrC1XEbs3uDh0ZIUvH5WGg850S";

const searchURL = 'https://api.nps.gov/api/v1/parks';

function getParks(query, limit=10) {
  const params = {
    api_key:apiKey,
    stateCode: query,
    language: "en",
    limit:limit,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, limit))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();

    for (let i = 0; i < responseJson.data.length; i++){
    
    $('#results-list').append(
      `<li>
      <h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>
      </li>`
    )};


  //display the results section  
  $('#results').removeClass('hidden');
};


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const limit = $('#js-max-results').val();
    getParks(searchTerm, limit);
  });
}

$(watchForm);