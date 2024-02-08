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
