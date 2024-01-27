import { Observable } from "rxjs"

/* create a new observable, providing the observer. */
const observable: Observable<string> = new Observable((observer) => {
  const interval = setInterval(() => {
    observer.next("Hello world!")
  }, 2000)

  // teardown
  return () => {
    clearInterval(interval)
  }
})

/* Subscribe to Notifications. */
const app = document.getElementById("app")!
observable.subscribe(
  (value) => (app.innerHTML = `${app.innerHTML}<br>${value}`)
)
