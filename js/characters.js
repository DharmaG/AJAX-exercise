$(document).ready(() => {
  $('.post-wall-e').click(() => {
    const wallEInfo = {
      //the keys of thisobject match what the API needs
      name: 'WALL_E',
      occupation: 'Waste ALlocation  Robot',
      weapon: 'Head laser'
    };

    postCharacter( wallEInfo );
  });

  $('.new-char-form').submit((myEvent) => {
    myEvent.preventDefault();

    const newCharacterInfo = {
      name: $('#char-name-input').val(),
      occupation: $('#char-occupation-input').val(),
      weapon: $('#char-weapon-input').val()
    };
    postCharacter( newCharacterInfo);
  });

  $('.update-char-form').submit((myEvent) => {
    myEvent.preventDefault();

    const updateInfo = {
      name: $('#update-name-input').val(),
      occupation: $('#update-occupation-input').val(),
      weapon: $('#update-weapon-input').val()
    };
    const characterId = $('#update-char-id').val();

    $.ajax({
      url: 'https://ih-api.herokuapp.com/characters/' + characterId,
      method: 'PATCH',
      data: updateInfo,

      success: (updatedFromApi) => {
        console.log('Update Succes! 🙌');
        console.log(updatedFromApi);
      },

      error: (errorInfo) => {
        console.log('Update ERROR!💩');
        console.log(errorInfo);
      }
    });
  }); //close update submit
}); // close document ready

function postCharacter (characterSubmission) {
  $.ajax({
    url: 'https://ih-api.herokuapp.com/characters',
    method: 'POST',

    // the "data" AJAX setting is how we send data to an API
    data: characterSubmission,

    success: (postResult) => {
      console.log('POST WALL_E success! 🤖');
      console.log( postResult );

      $('.character-list').append(`
          <li>
            <h3> ${postResult.name} </h3>
            <p> ID: ${postResult.id} </p>
            <p> Occupation: ${postResult.occupation}</p>
            <p> Weapon: ${postResult.weapon}</p>
            <p> Debt: ${postResult.debt} </p>
          </li>
        `);
    },
    error:(errorInfo) => {
      console.log('POST WALL_E FAILURE! 🤢');
      console.log(errorInfo);
    }
  });
}
