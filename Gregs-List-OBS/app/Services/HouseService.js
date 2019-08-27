import House from "../Models/House.js";

// @ts-ignore
let _houseApi = axios.create({
  baseURL: 'http://bcw-sandbox.herokuapp.com/api/houses'
})



//Private
let _state = {
  houses: []
}

//NOTE methods to run when a given property in state changes
let _subscribers = {
  houses: []
}

function _setState(propName, data) {
  //NOTE add the data to the state
  _state[propName] = data
  //NOTE run every subscriber function that is watching that data
  _subscribers[propName].forEach(fn => fn());
}

//Public
export default class HouseService {
  //NOTE adds the subscriber function to the array based on the property it is watching
  addSubscriber(propName, fn) {
    _subscribers[propName].push(fn)
  }

  get Houses() {
    return _state.houses
  }


  getApiHouses() {
    _houseApi.get()
      .then(res => {
        let housesData = res.data.data.map(h => new House(h))
        _setState('houses', housesData)
      })
      .catch(err => {
        console.error(err)
      })
  }
  addHouse(data) {
    //NOTE A post request takes in the URLExtension and the data object to create from.
    _houseApi.post('', data)
      .then(res => {
        _state.houses.push(new House(res.data.data))
        _setState('houses', _state.houses)
      })
      .catch(err => {
        console.error(err)
      })
  }

  //House/:id
  deleteHouse(id) {
    //NOTE delete only requires the id, there is no "body"
    _houseApi.delete(id)
      .then(res => {
        // this.getApiHouse();
        //get the index of the object with a given id
        let index = _state.houses.findIndex(house => house._id == id)
        _state.houses.splice(index, 1)
        _setState('houses', _state.houses)
      })
      .catch(err => {
        console.error(err)
      })
  }

  bid(id) {
    //find the object, increase its price by $1
    let house = _state.houses.find(c => c._id == id)
    house.price++
    //NOTE put will require the id, and the body with the update
    _houseApi.put(id, { price: house.price })
      .then(res => {
        _setState('houses', _state.houses)
      })
  }

}