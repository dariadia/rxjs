import { Observable } from "rxjs"

/* create a new observable, providing the observer. */
export const SampleObservable: Observable<string> = new Observable((observer) => {
  let count = 0
  const interval = setInterval(() => {
    count += 1
    observer.next("Hello world!" + " " + count)
    if (count === 5) observer.complete()
  }, 2000)

  // runs once
  observer.next("Hello!")

  // teardown
  return () => {
    clearInterval(interval)
  }
})

export const SampleObservable2 = new Observable(function subscribe(subscriber) {
  // Keep track of the interval resource
  const intervalId = setInterval(() => {
    subscriber.next('I am sample 2.')
  }, 3000)
 
  // Provide a way of canceling and disposing the interval resource
  return function unsubscribe() {
    clearInterval(intervalId)
  }
})
