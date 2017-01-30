function CardsController() {


  var dataStore = new MarvelService()


  dataStore.getCharacters(ready)

  function ready(data) {

    draw(data, [])

    this.onAdd = function(characterID) {
      //this function will take the player that was clicked and add them to your team through the dataStore.
      var marvelCharacters = dataStore.getMarvelCharacters()
      var myCharacters = dataStore.getMyCharacters()

     
      dataStore.addToMyCharacters(characterID)
      draw(marvelCharacters, myCharacters)
    }

    this.onRemove = function(characterID) {
      //this will remove the character from your team

      var marvelCharacters = dataStore.getMarvelCharacters()
      var myCharacters = dataStore.getMyCharacters()
     
      dataStore.removeMyCharacter(characterID)
      draw(marvelCharacters, myCharacters)
    }


    function draw(marvelList, myList) {
      //target is the id of the element where the list will be rendered
      var marvelElem = document.getElementById('marvel-characters')
      var myElem = document.getElementById('my-characters')
      marvelElem.innerHTML = ''
      myElem.innerHTML = ''

      var marvelTemplate = ''
      var myTemplate = ''

      for (var i in marvelList) {
        var character = marvelList[i];
        marvelTemplate += `
          <div class="card">
            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" width="100">
            <h3>${character.name}</h3>
            <div>
              <button class="btn-success" onclick="onAdd(${character.id})" id="${character.id}">Add to Team</button>
            </div>
          <div>
        `
      }

      for (var i in myList) {
        var character = myList[i];
        myTemplate += `
          <div class="card">
            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" width="100">
            <h3>${character.name}</h3>
            <div>
              <button class="btn-danger" onclick="onRemove(${character.id})" id="${character.id}">DESTROY FOREVER</button>
            </div>
          <div>
          `
      }

      marvelElem.innerHTML = marvelTemplate + "</div>"
      myElem.innerHTML = myTemplate  + "</div>";

    }

  }

}