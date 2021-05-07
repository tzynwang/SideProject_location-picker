const elementObjects = {
  locationInput: document.querySelector('#location'),
  addLocationButton: document.querySelector('#addLocationButton'),
  decideLocationButton: document.querySelector('#decideLocationButton'),
  listContainer: document.querySelector('section.output'),
  announceLocation: document.querySelector('#announceLocation'),
  locationPendingList: document.querySelector('#locationPendingList')
}

const view = {
  addLiToList (input) {
    const li = document.createElement('li')
    li.innerHTML = `${input.trim()} <i class="remove bi bi-trash"></i>`
    elementObjects.locationPendingList.appendChild(li)
  },
  cleanInput (target) {
    target.value = ''
  },
  removeList (target) {
    target.parentElement.remove()
  },
  announcePickedLocation (locationCollection) {
    const index = Math.floor(Math.random() * locationCollection.length)
    const pickedLocation = locationCollection[index].innerText.trim()
    elementObjects.announceLocation.innerHTML = pickedLocation
  }
}

const controller = {
  inputVerify (input) {
    return input.trim() !== ''
  },
  collectionVerify (collection) {
    return collection.length > 0
  },
  addLocation () {
    const userInput = elementObjects.locationInput.value
    if (controller.inputVerify(userInput)) {
      view.addLiToList(userInput)
      view.cleanInput(elementObjects.locationInput)
    }
  },
  decideLocation () {
    const allLocations = elementObjects.locationPendingList.children
    if (controller.collectionVerify(allLocations)) {
      view.announcePickedLocation(allLocations)
    }
  }
}

// add location
elementObjects.addLocationButton.addEventListener('click', () => {
  controller.addLocation()
})
elementObjects.locationInput.addEventListener('keypress', (event) => {
  const keyCode = event.code || event.key
  if (keyCode === 'Enter') {
    controller.addLocation()
  }
})

// decide a location
elementObjects.decideLocationButton.addEventListener('click', () => {
  controller.decideLocation()
})

// remove listed location item
elementObjects.listContainer.addEventListener('click', (event) => {
  const target = event.target
  if (target.classList.contains('remove')) {
    view.removeList(target)
  }
})
