import { of, scan, map } from 'rxjs'

const numbers$ = of(1, 2, 3)

numbers$
  .pipe(
    scan((total, n) => total + n),
    // Get the average by dividing the sum by the total number
    // received so far (which is 1 more than the zero-based index).
    map((sum, index) => sum / (index + 1))
  )
  .subscribe(console.log)
