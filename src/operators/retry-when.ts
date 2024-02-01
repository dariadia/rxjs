// conditionally retry a source Observable that emits an error notification.
// When the source Observable emits an error notification the retryWhen() operator invokes the notifer function provided. The notifier function receives an errors Observable. When the errors Observable emits either an error or complete notification then the operator will invoke the error() or complete() method on the child subscription. If next notification is emitted from the errors Observable then the operator resubscribes to the source Observable.

import { of, throwError } from "rxjs"
import { ajax } from "rxjs/ajax"
import { catchError, mergeMap, retryWhen } from "rxjs/operators"

const source = ajax.getJSON(`https://reqres.in/api/users/20`).pipe(
  catchError((error) => {
    console.error("catchError", error)
    return throwError(error)
  }),
  retryWhen((notifier) =>
    notifier.pipe(
      mergeMap((error, index) => {
        if (index < 2 && error.status === 404) return of(null)
        return throwError(error)
      })
    )
  )
)

window.setTimeout(() => {
  source.subscribe({
    error: (e) => console.error("observer", e),
    next: console.log,
    complete: () => console.log("complete")
  })
}, 2000)
