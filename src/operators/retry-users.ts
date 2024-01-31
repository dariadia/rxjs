import { fromEvent, throwError } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { catchError, finalize, map, mergeMap, retry } from 'rxjs/operators'

/** The UserResponse represents the shape of the response from the API. */
interface UserResponse {
  data: {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
  }
}

const random = (max: number, min: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

const output = document.getElementById('output') as HTMLTextAreaElement
const btn = document.getElementById('btn') as HTMLButtonElement

const getter = fromEvent(btn, 'click')
  .pipe(
    map(() => random(10, 15)),
    mergeMap((id) => {
      console.log("will try and fetch", id)
      return ajax.getJSON<UserResponse>(`https://reqres.in/api/users/${id}`).pipe(
        map((response) => response.data),
        catchError((error) => {
          output.value += `Error is: \n\n${error.message}`
          output.scrollTop = output.scrollHeight
          return throwError(error)
        })
      )
    }
    ),
    retry(4),
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

export default getter
