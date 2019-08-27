export default class Car {
  constructor(data) {
    this._id = data._id
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.imgUrl = data.imgUrl
    this.year = data.year
    this.levels = data.levels
    this.price = data.price
    this.description = data.description
  }

  get Template() {
    return `
  <div class="col-3">
            <div class="card mb-3">
  <img class="card-im card-size">
                <img class="card-img-top" src="${this.imgUrl}" alt="Card image cap" class="image-thumbnail">
                <div class="card-body">
                    <h5 class="card-title">${this.year} - Floors: ${this.levels} -Bedrooms: ${this.bedrooms} -Bathrooms: ${this.bathrooms}</h5>
                    <p class="card-text">${this.description}</p>
                    <p><sm>$${this.price}</sm></p>
                    <button class="btn btn-info" onclick="app.controllers.carCtrl.bid('${this._id}')">Bid</button>
                    <button class="btn btn-danger" onclick="app.controllers.carCtrl.delete('${this._id}')">Delete Car</button>
                </div >
            </div >
        </div >
      
    `
  }





}