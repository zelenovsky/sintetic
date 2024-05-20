function createRenderer(elem) {
  return {
    element: elem,
    render(state) {
      elem.querySelector('[data-gallery="images"] li.is-active').classList.remove('is-active')
      elem.querySelector(`[data-gallery="images"] li:nth-child(${state.currentPosition})`).classList.add('is-active')
      elem.querySelector('[data-gallery="pagination"] li.is-active').classList.remove('is-active')
      elem.querySelector(`[data-gallery="pagination"] li:nth-child(${state.currentPosition})`).classList.add('is-active')
      elem.querySelector('[data-gallery="descriptions"] li.is-active').classList.remove('is-active')
      elem.querySelector(`[data-gallery="descriptions"] li:nth-child(${state.currentPosition})`).classList.add('is-active')
    }
  }
}

function nextMover(renderer) {
  const galleryImages = renderer.element.querySelector('[data-gallery="images"]')
  const imageWidth = galleryImages.firstElementChild.clientWidth
  const imagesLength = galleryImages.children.length

  return function(state) {
    const nextPosition = state.currentPosition + 1 > imagesLength ? state.currentPosition : state.currentPosition + 1
    state.currentPosition = nextPosition
    galleryImages.scrollTo({ left: imageWidth * (nextPosition - 1), top: 0, behavior: 'smooth' })
    renderer.render(state)
  }
}

function prevMover(renderer) {
  const galleryImages = renderer.element.querySelector('[data-gallery="images"]')
  const imageWidth = galleryImages.firstElementChild.clientWidth

  return function(state) {
    const prevPosition = state.currentPosition - 1 === 0 ? state.currentPosition : state.currentPosition - 1
    state.currentPosition = prevPosition
    galleryImages.scrollTo({ left: imageWidth * (prevPosition - 1), top: 0, behavior: 'smooth' })
    renderer.render(state)
  }
}

function initGallery(elem) {
  const state = {
    currentPosition: 1
  }

  let touchstartX = 0
  let touchendX = 0

  const next = elem.querySelector('[data-gallery="action-next"]')
  const prev = elem.querySelector('[data-gallery="action-prev"]')

  const renderer = createRenderer(elem)
  const moveNext = nextMover(renderer)
  const movePrev = prevMover(renderer)

  for (const eventName of ['mousedown', 'touchstart']) {
    elem.addEventListener(eventName, (event) => {
      if (event instanceof TouchEvent) {
        touchstartX = event.touches[0].screenX
      } else {
        touchstartX = event.screenX
      }
    }, false)
  }

  for (const eventName of ['mouseup', 'touchend']) {
    elem.addEventListener(eventName, (event) => {
      if (event instanceof TouchEvent) {
        touchendX = event.changedTouches[0].screenX
      } else {
        touchendX = event.screenX
      }

      if (touchendX < touchstartX) {
        moveNext(state)
      }

      if (touchendX > touchstartX) {
        movePrev(state)
      }
    }, false)
  }

  next.addEventListener('click', () => {
    moveNext(state)
  })

  prev.addEventListener('click', () => {
    movePrev(state)
  })
}

const galleryElems = document.querySelectorAll('[data-gallery="root"]')

for (const elem of galleryElems) {
  initGallery(elem)
}
