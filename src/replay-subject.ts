import { ReplaySubject } from 'rxjs'

// As the name suggests, the notifications are "replayed" to an Observer no matter when the Observer subscribes.

/* Create an instance of ReplaySubject. */
const replaySubject = new ReplaySubject<number>()

// or with buffer size = 2 last
// const replaySubject = new ReplaySubject<number>(2)

/* Subscribe to subject. */
replaySubject.subscribe({
  next: (value) => console.log('before:', value),
  error: (error) => console.error('before', error),
  complete: () => console.log('complete before')
})

/* Emit some values. */
replaySubject.next(1)
replaySubject.next(2)
replaySubject.next(3)

/* Subscribe late to subject. */
replaySubject.subscribe({
  next: (value) => console.log('after:', value),
  error: (error) => console.error('after:', error),
  complete: () => console.log('complete after')
})

/* Complete the observable stream. */
replaySubject.complete()

export default replaySubject
