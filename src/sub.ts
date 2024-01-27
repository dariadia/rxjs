import { Observable } from "rxjs"

/* create a new observable, providing the observer. */
export const Sub: Observable<number> = new Observable((observer) => {
  console.log('%cNew subscription created', 'background: #222 color: #bada55')
  let i = 0

  const interval = setInterval(() => {
    observer.next(i++)
  }, 1000)

  return () => {
    clearInterval(interval)
  }
})

