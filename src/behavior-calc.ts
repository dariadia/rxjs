import { BehaviorSubject, fromEvent } from 'rxjs'
import { map, scan } from 'rxjs/operators'

const behaviorSubject = new BehaviorSubject<number>(0)

// Use the `scan()` operator to sum the values emitted by the BehaviorSubject.
// Subscribe to the BehaviorSubject and set the value property for the `sum` input.
const sum = document.getElementById('sum') as HTMLInputElement
behaviorSubject
  .pipe(scan<number, number>((prev, value) => prev + value, 0))
  .subscribe((value) => (sum.value = value.toString()))

// Use the `fromEvent()` operator to add an event listener to `add` & `sub` elements.
// Use `map()` to map the MouseEvent to either 1/-1 for the add/subtract respectively.
// Subscribe to the event stream for both buttons  and set the Observer to the `BehaviorSubject` instance.

const add = document.getElementById('add') as HTMLButtonElement
const sub = document.getElementById('sub') as HTMLButtonElement

fromEvent(add, 'click')
  .pipe(map(() => 1))
  .subscribe(behaviorSubject)
fromEvent(sub, 'click')
  .pipe(map(() => -1))
  .subscribe(behaviorSubject)

export default behaviorSubject
