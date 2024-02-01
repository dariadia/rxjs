import { fromEvent, of, throwError } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import {
  catchError,
  finalize,
  map,
  mergeMap,
  retryWhen
} from 'rxjs/operators'

interface UserResponse {
  data: {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
  }
}

function random(max: number, min: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const output = document.getElementById('output') as HTMLTextAreaElement
const btn = document.getElementById('btn') as HTMLButtonElement

fromEvent(btn, 'click')
  .pipe(
    map(() => random(10, 15)),
    mergeMap((id) =>
      ajax.getJSON<UserResponse>(`https://reqres.in/api/users/${id}`).pipe(
        map((response) => response.data),
        catchError((error) => {
          output.value += `\n\n${error.message}`
          output.scrollTop = output.scrollHeight
          return throwError(error)
        }),
        retryWhen((notifier) =>
          notifier.pipe(
            mergeMap((error, i) => {
              // retry maximum of 2 times when the status code is 404
              const MAX_RETRIES = 2
              if (i < MAX_RETRIES) {
                if (error.status === 404) return of(null)
              }
              return throwError(error)
            })
          )
        )
      )
    ),
    finalize(() => {
      btn.classList.add('cursor-not-allowed')
      btn.classList.add('opacity-50')
    })
  )
  .subscribe({
    error: (e) => console.error('observer', e),
    next: (value) => {
      output.value += `\n\n${JSON.stringify(value, null, 2)}`
      output.scrollTop = output.scrollHeight
    },
    complete: () => console.log('complete')
  })
