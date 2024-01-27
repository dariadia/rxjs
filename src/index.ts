import { Sub } from "./sub"

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
        `${app.innerHTML}<br><span style="color: purple">First: ${value}</span>`))
    ),
  500
)

/* Unsubscribe after 5 seconds. */
setTimeout(() => {
  subscription.unsubscribe()
}, 5000)
