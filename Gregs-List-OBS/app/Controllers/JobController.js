import JobService from "../Services/JobService.js";

//Private
let _js = new JobService()

function _draw() {
  let jobs = _js.Jobs
  let template = ''
  jobs.forEach(j => template += j.Template)
  document.getElementById('jobs-cards').innerHTML = template
}

//Public
export default class JobController {
  constructor() {
    //NOTE Register all subscribers
    _js.addSubscriber('jobs', _draw)

    //NOTE Retrieve data
    _js.getApiJobs();
  }

  addjob(e) {
    e.preventDefault();
    let form = e.target
    let data = {
      company: form.company.value,
      jobTitle: form.jobTitle.value,
      hours: form.hours.value,
      rate: form.rate.value,
      description: form.description.value,
    }
    _js.addJob(data)
    form.reset()

  }

  deleteJob(id) {
    if (window.confirm('Are you sure you want to delete?')) {
      _js.deleteJob(id)
    }
  }
  applyJob(id) {
    _js.apply(id)
  }












}