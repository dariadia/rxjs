import { Observable } from "rxjs"

/* create a new observable, providing the observer. */
export const SampleObservable: Observable<string> = new Observable((observer) => {
  let count = 0
  const interval = setInterval(() => {
    count += 1
    observer.next("Hello world!" + " " + count)
    if (count === 5) observer.complete()
  }, 2000)

  // teardown
  return () => {
    clearInterval(interval)
  }
})
