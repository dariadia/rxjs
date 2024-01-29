import { fromEvent, map, mergeScan, of } from 'rxjs'

// similar to scan, but the Observables returned by the accumulator are merged into the OUTER Observable.

const click$ = fromEvent(document, 'click')
const one$ = click$.pipe(map(() => 1))
const seed = 0
const count$ = one$.pipe(
  mergeScan((acc, one) => of(acc + one), seed)
)

count$.subscribe(x => console.log(x))
