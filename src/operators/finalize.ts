// almost similar to the built-in try...catch...finally in JS.
// The finalize() operator accepts a callback function that will be invoked upon the source Observable emitting an error or completion notification, or when a subscriber unsubscribes.

import { Subject, throwError } from 'rxjs'
import { catchError, finalize, tap } from 'rxjs/operators'

const subject = new Subject<number>()

subject
  .pipe(
    tap((value) => {
      if (value > 1) throw new Error('Throwing an error')
    }),
    catchError(error => {
      console.error('catchError', error)
      return throwError(error).pipe(
        tap(null, (error) => {
          console.log('tap', error)
        })
      )
    }),
    finalize(() => console.log('finalize'))
  )
  .subscribe({
    error: (e) => console.error('observer', e),
    next: (value) => console.log('next', value),
    complete: () => console.log('complete')
  })

subject.next(1)
subject.next(2)
