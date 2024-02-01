// The throwIfEmpty() operator will return an Observable that immediately emits an error notification if the source Observable emits a completion notification without any next notifications.
// can be helpful to know when an Observable that is expected to produce a value, and thus emit a next notification, and never does.

import { Subject } from 'rxjs'
import { throwIfEmpty } from 'rxjs/operators'

const subject = new Subject()

subject.pipe(throwIfEmpty(() => new Error('nothing to see here'))).subscribe({
  error: (e) => console.error('observer', e),
  next: console.log,
  complete: () => console.log('complete')
})

subject.complete()
