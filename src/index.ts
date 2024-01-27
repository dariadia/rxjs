import { SampleObservable, SampleObservable2 } from './sample-observable'

const app = document.getElementById("app")!
SampleObservable.subscribe(
  (value) => (app.innerHTML = 
    `${app.innerHTML}<br><span style="color: purple">${value}</span>`)
)

SampleObservable2.subscribe(
  (value) => (app.innerHTML = 
    `${app.innerHTML}<br><span style="color: green">${value}</span>`)
)
