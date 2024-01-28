import { BehaviorSubject } from "rxjs"

// BehaviorSubject requires an initial seed value.
// An Observer always receives the LAST NEXT notification emitted (or the seed value).
// An Observer receives all next notification until unsubscribing, or until the Observable completes or errors.
// Once the BehaviorSubject is complete any new Observers will receive the last next notification and the complete notification in the same frame.
// When the BehaviorSubject emits an error notification, all Observers receive the error notification, including those Observers that subscribed after the error notification.

// Basically: see the one earlier post before you subscribed to a channel.

/* Create an instance of BehaviorSubject. */
const behaviorSubject = new BehaviorSubject<number>(0)

/* Subscribe to subject. */
behaviorSubject.subscribe({
  next: (value) => console.log('before:', value),
  error: (error) => console.error('before', error),
  complete: () => console.log('complete before')
})

/* Emit some values. */
behaviorSubject.next(1)
behaviorSubject.next(2)
behaviorSubject.next(3)

/* Subscribe late to subject. */
behaviorSubject.subscribe({
  next: (value) => console.log('after:', value),
  error: (error) => console.error('after:', error),
  complete: () => console.log('complete after')
})

export default behaviorSubject
