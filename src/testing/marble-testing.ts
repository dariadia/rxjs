/* 

Marble string syntax:

Whitespace is ignored.
- A dash represents a frame (= one virtual milliseconds)
[a-z0-9] a next notification.
| A completion notification.
# An error notification.

[0-9]ms represents N number of milliseconds.
[0-9]s represents N number of seconds.
[0-9]m represents N number of minutes.

Finally, we can group together notifications that occur in the same frame using parenthesis. For example, our Observable may emit a notification and complete in the same frame: (a|).

*/

// a cold Observable that emits 3 values and then completes:
// A next notification on frames 0, 2, and 4.
// The Observable completes on frame 6.
const source1 = cold('a-b-c-|')

// a cold Observable that emits an error after 1000 milliseconds:
const source2 = cold('1000ms #')

// a cold Observable that emits a next notification and completes in the same frame after 1000 millisconds:
const source3 = cold('1000ms (a|)')



import { interval } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { filter, map, tap } from 'rxjs/operators'

describe('getting started with RxJS testing with marbles', () => {
  let testScheduler: TestScheduler

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) =>
      expect(actual).toEqual(expected)
    )
  })

  test('say hello world then complete', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const values = {
        a: 'hello',
        b: 'world'
      }
      const source = cold('-a-b-|', values)
      const expected = '   -a-b-|'
      expectObservable(source).toBe(expected, values)
    })
  })

  test('filter odd values', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const values = {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
        e: 4,
        f: 5
      }
      const source = cold('abcdef|', values).pipe(filter((value) => value % 2 === 0))
      const expected = '   a-c-e-|'
      expectObservable(source).toBe(
        expected,
        values
      )
    })
  })
})
