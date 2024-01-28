import { ConnectableObservable, Observable, interval } from 'rxjs'
import { publish, refCount } from 'rxjs/operators'

/* Create a new observable, providing the observer. */
const observable = new Observable<number>((observer) => {
  console.log('%cNew subscription', 'color: gold')
  let i = 0
  const interval = setInterval(() => observer.next(i++), 1000)
  return () => clearInterval(interval)
})

// or without the testing log
// const observable = interval(1000)

/** Create the ConnectableObservable. */
const multicasted = observable.pipe(
  publish(),
  refCount()
) as ConnectableObservable<number>

/* Each subscription receives a copy of Observer. */
const subscription = multicasted.subscribe((value) =>
  console.log('First subscription', value)
)
subscription.add(
  multicasted.subscribe((value) => console.log('Second subscription', value))
)

/* Complete the observable after 5 seconds. */
setTimeout(() => subscription.unsubscribe(), 5000)

export default subscription
