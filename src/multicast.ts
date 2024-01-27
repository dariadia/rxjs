import { from, Subject, multicast, Observable } from 'rxjs'

const source: Observable<number> = from([1, 2, 3, 4, 5])
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

export const multicasted = _multicasted
