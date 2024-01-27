import { Observable } from 'rxjs'
 
const SampleObservable2 = new Observable(function subscribe(subscriber) {
  // Keep track of the interval resource
  const intervalId = setInterval(() => {
    subscriber.next('hi')
  }, 1000)
 
  // Provide a way of canceling and disposing the interval resource
  return function unsubscribe() {
    clearInterval(intervalId)
  }
})
