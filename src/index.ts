import { SampleObservable } from './sample-observable'

const app = document.getElementById("app")!
SampleObservable.subscribe(
  (value) => (app.innerHTML = `${app.innerHTML}<br>${value}`)
)
