import { of, Subject, throwError } from 'rxjs'
import { mergeMap, tap } from 'rxjs/operators'

const subject = new Subject<number>()

subject
  .pipe(
    mergeMap((value) =>
      value > 1
        ? throwError(new Error('Error emitted by throwError'))
        : of(value)
    ),
    tap((value) => console.log('tap', value))
  )
  .subscribe({
    error: (e) => console.error('observer', e),
    next: (value) => console.log('next', value),
    complete: () => console.log('complete')
  })

// The throwError() operator accepts either an error value, 
// or a factory function that produces an error value.
// The throwError operator is very useful because it returns a new Observable that immediately emits an error notification. This enables us to leverage the Observable that is returned from the throwError operator.

  // observable.pipe(
  //   mergeMap(id => 
  //     id === null 
  //       ? throwError(() => {
  //           const error = new Error('id is null');
  //           errorService.notify(error)
  //           return error
  //       })
  //      : fetchUser(id)
  //   )
  // ).subscribe()

// or

  // subject
  // .pipe(
  //   tap((value) => {
  //     if (value > 1) {
  //       throw new Error('Error emitted by throwError')
  //     }
  //   }),
  //   tap((value) => console.log('tap', value))
  // )

subject.next(1)
subject.next(2)
