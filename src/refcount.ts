import { ConnectableObservable, Observable, Subject } from 'rxjs'
import { multicast, refCount } from 'rxjs/operators'

/* Create a new observable, providing the observer. */
const observable = new Observable<number>((observer) => {
  console.log('%cNew subscription', 'color: gold')
  let i = 0
  const interval = setInterval(() => {
    observer.next(i++)
  }, 1000)
  return () => clearInterval(interval)
})

/** Create the ConnectableObservable. */
const subject = new Subject<number>()
const multicasted = observable.pipe(
  multicast(subject),
  refCount()
)

/* Each subscription receives a copy of Observer. */
const _refcount = multicasted.subscribe((value) =>
  console.log(`\%c First subscription ${value}`, 'color: green')
)
_refcount.add(
  multicasted.subscribe((value) => console.log(`\%c Second subscription ${value}`, 'color: purple'))
)

/* Complete the observable after 5 seconds. */
setTimeout(() => _refcount.unsubscribe(), 5000)

export const refcount = _refcount
