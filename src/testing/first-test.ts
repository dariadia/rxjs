import { TestScheduler } from 'rxjs/testing'
import { map } from 'rxjs/operators'

describe('getting started with RxJS testing with marbles', () => {
  let testScheduler: TestScheduler

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) =>
      expect(actual).toEqual(expected)
    )
  })

  test('map values for the 10x developer', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const values = {
        a: 1,
        b: 10
      }
      const source = cold('1000ms a', values)
      const expected = '   1000ms b'
      expectObservable(source.pipe(map((value) => value * 10))).toBe(
        expected,
        values
      )
    })
  })
})

