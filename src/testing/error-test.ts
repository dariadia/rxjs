import { interval, of, throwError } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { mergeMap } from 'rxjs/operators'

describe('getting started with RxJS testing with marbles', () => {
  let testScheduler: TestScheduler

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) =>
      expect(actual).toEqual(expected)
    )
  })

  test('error notification', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const source = cold('100ms 0 99ms #')
      const expected = '   100ms 0 99ms #'
      expectObservable(source).toBe(expected)
    })
  })

  test('throw error', () => {
    testScheduler.run(({ expectObservable }) => {
      const source = interval(100).pipe(
        mergeMap((value) => {
          if (value > 0) return throwError('error')
          return of(value)
        })
      )
      const expected = '100ms 0 99ms #'
      expectObservable(source).toBe(expected, [0])
    })
  })
})

/* First we define the source Observable, which emits an incrementing integer starting from 0 every 100 milliseconds. If the value emitted is greater than 0 the Observable emits an error notification that is triggered by the throwError() operator.
The expected behavior is such that after 100 milliseconds the source Observable emits a next notification with the value 0. We progress the virtual time 99 milliseconds (or 99 frames) and then expect an error notification on frame 200. */
