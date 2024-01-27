import { Observable } from "rxjs"

/* create a new observable, providing the observer. */
export const SampleObservable: Observable<string> = new Observable((observer) => {
  const interval = setInterval(() => {
    observer.next("Hello world!")
  }, 2000)

  // teardown
  return () => {
    clearInterval(interval)
  }
})
