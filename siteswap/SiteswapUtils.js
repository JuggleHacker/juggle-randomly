function stateAftermakingThrow(state, throwToMake) {
    if (state[0] == 0) {
        if (throwToMake == 0) {
            return state.slice(1)
        } else {
            throw `Trying to throw a ${throwToMake} but don't have an object to throw! State is ${state}`
        }
    } else {
        const paddedState = throwToMake >= state.length ? state.concat(Array(1 + throwToMake - state.length).fill(0)) : state.slice()
        if (paddedState[throwToMake] != 0) {
            throw `Cannot throw a ${throwToMake} because it would collide! State is ${paddedState}`
        } else {
            paddedState[throwToMake] = 1
            return paddedState.slice(1)
        }
    }
  }
  
  function validThrows(state, candidateThrows) {
    if (state[0] == 0) {
        return [0]
    } else {
        const heighestThrow = Math.max(...candidateThrows)
        const paddedState =  heighestThrow >= state.length ? state.concat(Array(1 + heighestThrow - state.length).fill(0)) : state.slice()
        return candidateThrows.filter(throwHeight => paddedState[throwHeight] == 0)
    }
  }
  
  function generateRandomSiteswap(numberOfObjects, maxThrowHeight, throwsToMake, handAcrossToAvoidEmptyHand) {
    const groundState = Array(numberOfObjects).fill(1)
    var throwsMade = 0
    var state = groundState.slice()
    var siteswap = []
    while (throwsMade < throwsToMake || JSON.stringify(state) != JSON.stringify(groundState)) {
      const possibleThrows = validThrows(state, [...Array(maxThrowHeight+1).keys()])
      const chosenThrow = state[1] == 0 && handAcrossToAvoidEmptyHand ? 1 : possibleThrows[Math.floor(Math.random() * possibleThrows.length)]
      throwsMade += 1
      state = stateAftermakingThrow(state, chosenThrow)
      siteswap = siteswap.concat(chosenThrow)
    }
    return siteswap
  }

export default generateRandomSiteswap;