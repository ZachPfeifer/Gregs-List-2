export default class Job {
  constructor(data) {
    this._id = data._id
    this.company = data.company
    this.jobTitle = data.jobTitle
    this.hours = data.hours
    this.rate = data.rate
    this.description = data.description
  }

  get Template() {
    return `
        <div class="col-3">
            <div class="card mb-3">
  <img class="card-im card-size">
                <div class="card-body">
                    <h5 class="card-title">
                    Average Hours${this.hours}
                    <br>
                     Company Name: ${this.company}
                     <br>
                    Job Title: ${this.jobTitle}</h5>
                     <br>
                    <p class="card-text">Description: ${this.description}</p>
                    <p><sm>Pay: $${this.rate}/Hr</sm></p>
                    <button class="btn btn-info" onclick="app.controllers.jobController.bid('${this._id}')">Apply</button>
                    <button class="btn btn-danger" onclick="app.controllers.jobController.delete('${this._id}')">Delete Listing</button>
                </div >
            </div >
        </div >
            `
  }
}