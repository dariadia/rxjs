import { interval, Subject } from 'rxjs'
import { multicast, refCount } from 'rxjs/operators'

const observable = interval(1000)
const subject = new Subject()
const multicasted = observable.pipe(multicast(subject), refCount())

// Subscribe to the multicasted observable and keep a reference to the Subscription
const _subscription = multicasted.subscribe(console.log)
_subscription.add(multicasted.subscribe(console.log))

setTimeout(() => _subscription.unsubscribe(), 5000)

export const subscription = _subscription
