import { Subject, multicast, Observable, takeUntil } from 'rxjs'

const completeSubject = new Subject<void>()

const source: Observable<number> = new Observable<number>((observer) => {
  console.log('%cNew subscription', 'color: gold')
  let i = 0
  const interval = setInterval(() => {
    observer.next(i++)
  }, 1000)
  return () => {
    clearInterval(interval)
  }
}).pipe(takeUntil(completeSubject))

const subject = new Subject()
const _multicasted = source.pipe(multicast(subject))

// These are, under the hood, `subject.subscribe({...})`:
_multicasted.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
})
_multicasted.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
})

// This is, under the hood, `source.subscribe(subject)`:
_multicasted.connect()

setTimeout(() => {
  completeSubject.next()
  completeSubject.complete()
}, 5000)

export const multicasted = _multicasted
