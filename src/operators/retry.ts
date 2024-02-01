// accepts an optional number of retries,
// when the source Observable emits an error, the operator returns a clone of the source Observable excluding the error notification. When the number of retries is reached, it will return the source Observable with the error notification.

// works with both hot and cold Observables, but may lead to some confusion when using a hot observable. This is because the "retry" will not occur until the hot source Observable emits a next notification.

import { Subject, throwError, defer } from 'rxjs'
import { catchError, finalize, retry, tap } from 'rxjs/operators'

const subject = new Subject<void>()

defer(() => {
  console.log('defer')
  return subject
})
  .pipe(
    tap(() => {
      throw new Error('Error emitted by throw')
    }),
    catchError((error) => {
      console.error('catchError', error)
      return throwError(error)
    }),
    retry(2),
    finalize(() => console.log('finalize'))
  )
  .subscribe({
    error: (e) => console.error('observer', e),
    next: (value) => console.log('next', value),
    complete: () => console.log('complete')
  })

subject.next()
subject.next()
subject.next()

// defer
// catchError Error: Error emitted by throw
// defer
// catchError Error: Error emitted by throw
// defer
// catchError Error: Error emitted by throw
// observer Error: Error emitted by throw
// finalize
