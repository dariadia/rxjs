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

// moved from index.ts
const app = document.getElementById("app")!

/* Each subscription receives a copy of Observer. */
const subscription = Sub.subscribe((value) =>
(app.innerHTML =
  `${app.innerHTML}<br><span style="color: green">First: ${value}</span>`)
)
setTimeout(
  () =>
    subscription.add(
      Sub.subscribe((value) => (app.innerHTML =
        `${app.innerHTML}<br><span style="color: purple">Second: ${value}</span>`))
    ),
  500
)

/* Unsubscribe after 5 seconds. */
setTimeout(() => {
  subscription.unsubscribe()
}, 5000)
