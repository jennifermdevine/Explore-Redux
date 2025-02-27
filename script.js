// DOM elements
const valueEl = document.getElementById('value')
const plusBtn = document.getElementById('plus')
const minusBtn = document.getElementById('minus')
const plusFiveBtn = document.getElementById('plus-five')
const minusFiveBtn = document.getElementById('minus-five')
const incrementOddButton = document.getElementById('increment-odd')
const incrementAsyncBtn = document.getElementById('increment-async')
const customInput = document.getElementById('custom-number')
const customSubmitBtn = document.getElementById('custom-submit')

// initial state value
const initialState = {
    value: 0
}

// reducer
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'counter/incremented':
            return { value: state.value + 1 }
        case 'counter/decremented':
            return { value: state.value - 1 }
        case 'counter/plus-five':
            return { value: state.value + 5 }
        case 'counter/minus-five':
            return { value: state.value - 5 }    
        case 'counter/custom':
            return { value: state.value + action.payload }
        default:
        return state
    }
}

// action object definitions
const addAction = {
  type: 'counter/incremented'
}

const subAction = {
  type: 'counter/decremented'
}

const addFiveAction = {
  type: 'counter/plus-five'
}

const minusFiveAction = {
  type: 'counter/minus-five'
}

const customAction = {
  type: 'counter/custom',
  payload: 0
}

// generating the store
let store = Redux.createStore(counterReducer)

// defining render
const render = () => {
    const state = store.getState()
    valueEl.innerHTML = state.value.toString()
}

// establishing dispatch functions
const addOne = () => {
  store.dispatch(addAction)
}

const subOne = () => {
  store.dispatch(subAction)
}

const addFive = () => {
  store.dispatch(addFiveAction)
}

const minusFive = () => {
  store.dispatch(minusFiveAction)
}

const addOneIfOdd = () => {
  if(store.getState().value % 2 !== 0) {
    store.dispatch(addAction)
  }
}

const addOneAsync = () => {
  setTimeout(() => {
  store.dispatch(addAction)
  }, 1000)
}

const customChange = () => {
  let payload = +customInput.value
  store.dispatch({ type: 'counter/custom', payload })
}

// event listeners
plusBtn.addEventListener('click', addOne)
minusBtn.addEventListener('click', subOne)
plusFiveBtn.addEventListener('click', addFive)
minusFiveBtn.addEventListener('click', minusFive)
incrementOddButton.addEventListener('click', addOneIfOdd)
incrementAsyncBtn.addEventListener('click', addOneAsync)
customSubmitBtn.addEventListener('click', customChange)

// initial render
render()

// subscribe reruns render on dispatch
store.subscribe(render)