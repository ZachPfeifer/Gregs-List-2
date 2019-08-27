import Job from "../Models/Job.js";

// @ts-ignore
let _jobApi = axios.create({
  baseURL: 'http://bcw-sandbox.herokuapp.com/api/jobs'
})



//Private
let _state = {
  jobs: []
}

//NOTE methods to run when a given property in state changes
let _subscribers = {
  jobs: []
}

function _setState(propName, data) {
  //NOTE add the data to the state
  _state[propName] = data
  //NOTE run every subscriber function that is watching that data
  _subscribers[propName].forEach(fn => fn());
}

//Public
export default class JobService {
  //NOTE adds the subscriber function to the array based on the property it is watching
  addSubscriber(propName, fn) {
    _subscribers[propName].push(fn)
  }

  get Jobs() {
    return _state.jobs.map(c => new Job(c))
  }


  getApiJobs() {
    _jobApi.get()
      .then(res => {
        let jobsData = res.data.data.map(j => new Job(j))
        _setState('jobs', jobsData)
      })
      .catch(err => {
        console.error(err)
      })
  }
  addJob(data) {
    //NOTE A post request takes in the URLExtension and the data object to create from.
    _jobApi.post('', data)
      .then(res => {
        _state.jobs.push(new Job(res.data.data))
        _setState('jobs', _state.jobs)
      })
      .catch(err => {
        console.error(err)
      })
  }

  deleteJob(id) {
    //NOTE delete only requires the id, there is no "body"
    _jobApi.delete(id)
      .then(res => {
        //get the index of the object with a given id
        let index = _state.jobs.findIndex(job => job._id == id)
        _state.jobs.splice(index, 1)
        _setState('jobs', _state.jobs)
      })
      .catch(err => {
        console.error(err)
      })
  }

  apply(id) {
    //find the object, increase its price by $1
    let job = _state.jobs.find(c => c._id == id)
    job.price++
    //NOTE put will require the id, and the body with the update
    _jobApi.put(id, { price: job.price })
      .then(res => {
        _setState('jobs', _state.jobs)
      })
  }

}