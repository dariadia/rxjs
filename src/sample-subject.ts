import { Subject } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map } from 'rxjs/operators'

interface UserResponse {
  data: {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
  }
}

const userSubject = new Subject()

const _user = ajax
  .getJSON<UserResponse>('https://reqres.in/api/users/2')
  .pipe(map((response) => response.data))

_user.subscribe({
  next: (user) => userSubject.next(user),
  error: (e) => userSubject.error(e),
  complete: () => userSubject.complete()
})

const sub = userSubject.subscribe(console.log)

export const user = _user
