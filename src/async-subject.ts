import { AsyncSubject } from 'rxjs'

// AsyncSubject emits ONLY the last value to all Observers ON completion.
// Basically, always just log the last value, even if omitted before subscription.

const asyncSubject = new AsyncSubject<number>()
asyncSubject.subscribe({
  next: (value) => console.log('before:', value),
  error: console.error,
  complete: () => console.log('complete before')
})

// Emit some values.
asyncSubject.next(1)
asyncSubject.next(2)
asyncSubject.next(3)

// Subscribe late to subject.
asyncSubject.subscribe({
  next: (value) => console.log('after:', value),
  error: console.error,
  complete: () => console.log('complete after')
})

// Complete the observable stream.
// If we do not complete, the AsyncSubject will never emit a next notification.
asyncSubject.complete()

export default asyncSubject
