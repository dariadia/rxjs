import { AsyncSubject, fromEvent } from 'rxjs'
import { first, tap } from 'rxjs/operators'

const body = document.querySelector('body')!
const clicks = fromEvent(body, 'mousedown').pipe(
  tap((event: MouseEvent) => console.log(event.pageX, event.pageY))
)

/**
 * 1. Create a new AsyncSubject and specify the generic type
 *    `MouseEvent` for the next notification..
 */
const asyncSubject = new AsyncSubject<MouseEvent>()

/**
 * 2. Subscribe to the `AsyncSubject` and set the `x` and `y`
 *    input values to the `pageX` and `pageY` values from the
 *    `MouseEvent` object.
 */
const x = document.querySelector('#x') as HTMLInputElement
const y = document.querySelector('#y') as HTMLInputElement
asyncSubject.subscribe((event) => {
  x.value = event.pageX.toString()
  y.value = event.pageY.toString()
})

/**
 * 3. Subscribee to the `clicks` observable using the `AsyncSubject`
 *    instance as the Observer.
 */
clicks.subscribe(asyncSubject)

/**
 * 4. Complete the `AsyncSubject` when the button is clicked.
 */
const btn = document.querySelector('#btn') as HTMLButtonElement
fromEvent(btn, 'click')
  .pipe(
    first(),
    tap(() => asyncSubject.complete())
  )
  .subscribe()

export default asyncSubject
