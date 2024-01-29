import { ReplaySubject, fromEvent } from 'rxjs'
import { map, scan } from 'rxjs/operators'

const replaySubject = new ReplaySubject<number>()

/**
 * Using the `fromEvent()` creation operator we add an event
 * listener to both the `add` and `sub` buttons.
 * For each click we `map()` to either 1/-1 appropriately.
 * Finally, we subscribe to the click event Observable and set
 * the `replaySubject` as the Observer.
 */
const add = document.getElementById('add') as HTMLButtonElement
const sub = document.getElementById('sub') as HTMLButtonElement
fromEvent(add, 'click')
  .pipe(map(() => 1))
  .subscribe(replaySubject)
fromEvent(sub, 'click')
  .pipe(map(() => -1))
  .subscribe(replaySubject)

/**
 * Again, using the `fromEvent()` creation operator we add an event
 * listener to the `calc` button.
 * When the user clicks the calc button we want to begin calculating
 * the sum of each click on the `add` or `sub` buttons.
 * The `replaySubject` will replay all previous next notification values
 * and we will continue to calculate the sum for future next notifications.
 */
const sum = document.getElementById('sum') as HTMLInputElement
const calc = document.getElementById('calc') as HTMLButtonElement
calc.addEventListener('click', () => {
  replaySubject
    .pipe(scan<number, number>((prev, value) => prev + value, 0))
    .subscribe((total) => (sum.value = total.toString()))
})

export default calc
