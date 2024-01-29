import { Subject } from 'rxjs';

// For when the emitted value doesn't matter as much as the fact that a value was emitted.

const subject = new Subject<void>()

subject.subscribe({
  next: () => console.log('One second has passed'),
})

setTimeout(() => subject.next(), 1000)
