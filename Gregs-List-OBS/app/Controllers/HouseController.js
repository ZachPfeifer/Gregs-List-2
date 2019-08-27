import HouseService from "../Services/HouseService.js";

//Private
let _hs = new HouseService()

function _draw() {
  let houses = _hs.Houses
  let template = ''
  houses.forEach(h => template += h.Template)
  document.getElementById('houses-cards').innerHTML = template
}

//Public
export default class HouseController {
  constructor() {
    //NOTE Register all subscribers
    _hs.addSubscriber('houses', _draw)

    //NOTE Retrieve data
    _hs.getApiHouses();
  }

  addHouse(e) {
    e.preventDefault();
    let form = e.target
    let data = {
      _id: form._id.value,
      bedrooms: form.bedrooms.value,
      bathrooms: form.bathrooms.value,
      imgUrl: form.imgUrl.value,
      year: form.year.value,
      level: form.level.value,
      price: form.price.value,
      description: form.description.value,
    }
    _hs.addHouse(data)
    form.reset()

  }

  deleteHouse(id) {
    if (window.confirm('Are you sure you want to delete?')) {
      _hs.deleteHouse(id)
    }
  }
  bidHouse(id) {
    _hs.bid(id)
  }












}