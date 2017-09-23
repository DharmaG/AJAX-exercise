$(document).ready(() => {
  $('.fetch-klang').click(() => {
    getPokemonInfo(25);
  });

  $('.pokemon-search').submit((myEvent) => {
    myEvent.preventDefault();
    const idFromInput = $('#poke-id').val();
    getPokemonInfo(idFromInput);
  });
});

function getPokemonInfo (pokemonId) {
      $('.pokemon-details').html('<img src="https://media.giphy.com/media/sSgvbe1m3n93G/giphy.gif">');

  // $.ajax() is a jQuery function
  $.ajax(
    // 1 argument -> settings object
    {
      url: 'http://pokeapi.co/api/v2/pokemon/' + pokemonId + '/',
      method: 'GET',

    //what to do when everything worked
      success: (infoFromApi) => {
          //start by displaying the variable you got from the API
          console.log('Pokemon fetch SUCCESS! 😎');
          console.log(infoFromApi);


          var secondType = '';
          if (infoFromApi.types.length === 2){
            var secondType = `<p> Type #2: ${infoFromApi.types[1].type.name} </p>`;

          }

          $('.pokemon-details').html(`
              <h2> ${infoFromApi.name} </h2>
              <img src="${infoFromApi.sprites.front_default}">
              <p> Type #1: ${infoFromApi.types[0].type.name} </p>
              ${secondType}
            `);

            // 2 types -> #6
            // 1 types ->#25
      },

    //what to de when the request errored (we didn't get the data)
      error: (errorInfo) => {
        console.log('Pokemon fetch ERROR! 🤡 ');
          console.log(errorInfo);
      }
    }
  );
}
