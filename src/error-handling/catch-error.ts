import { defer, fromEvent, Subject, throwError } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { catchError, mergeMap, tap } from 'rxjs/operators'

// catchError() is similar to the built-in try...catch in JavaScript.
// The catchError() Operator catches an error notification along with the original Observable that emitted the error notification, and returns a new Observable.

// The catchError() operator can be useful performing a SIDE EFFECT when an error notification is emitted. You can also use the catchError() operator for retrying the source Observable that produced the error notification, however, be WARNED that this can result in the creation of Observables that recursively, and endlessly, emit error notifications.

// Finally, the catchError() will catch error notifications that occur as a result of cold Observable producing an error or any operator that accepts a function from producing an error. The catchError() operator will not catch uncaught errors that occur during the production of values in a hot Observable, or during the subscription of a consumer to an Observable.


const subject = new Subject<number>()

defer(() => {
  console.log('defer')
  return subject
})
  .pipe(
    tap((value) => {
      if (value > 1) throw new Error('Error emitted by throw')
    }),
    catchError((error, caught) => {
      console.error('catchError', error)
      return throwError(error)
    })
  )
  .subscribe({
    error: (e) => console.error('observer', e),
    next: (value) => console.log('next', value),
    complete: () => console.log('complete')
  })

subject.next(1)
subject.next(2)


// Another sample

const login = document.getElementById('login') as HTMLFormElement;
const email = document.getElementById('email') as HTMLInputElement;
const password = document.getElementById('password') as HTMLInputElement;
fromEvent(login, 'submit')
  .pipe(
    tap((event) => event.preventDefault()),
    mergeMap((event) =>
      ajax
        .post('https://reqres.in/api/login', {
          email: email.value,
          password: password.value
        })
        .pipe(
          catchError((error) => {
            debugger;
            console.error(error);
            return throwError(error);
          })
        )
    )
  )
  .subscribe({
    error: (e) => console.error('observer', e),
    next: (value) => console.log('next', value),
    complete: () => console.log('complete')
  });
