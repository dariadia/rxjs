/* 

It is important to note that the assertions returned by either expectObservable or expectSubscriptions are not executed until the callback function provided to the run() method of the TestScheduler is returned. If we need to manually execute assertions in the queue, then we need to manually invoke the flush() method.

This is helpful for testing scenarios where an Observable performs side effects.

*/

import { interval } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { map, tap } from 'rxjs/operators'

describe('getting started with RxJS testing with marbles', () => {
  let testScheduler: TestScheduler

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) =>
      expect(actual).toEqual(expected)
    )
  })

  test('produce side effect', () => {
    testScheduler.run(({ expectObservable, flush }) => {
      // this is probably not a good idea :shrug:
      let counter = 0

      // produces a side effect
      const source = interval(1000).pipe(
        tap((i) => (counter = i)),
        map((i) => i.toString())
      )
      const subscription = '5001ms !'
      const expected = '1000ms 0 999ms 1 999ms 2 999ms 3 999ms 4'
      expectObservable(source, subscription).toBe(expected)

      // flush the scheduler
      flush()

      expect(counter).toBe(4)
    })
  })
})
