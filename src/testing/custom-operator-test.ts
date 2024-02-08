import { TestScheduler } from 'rxjs/testing'

import { verifyPasscode } from './verify-password.operator'

const BOOLEANS = {
  T: true,
  F: false
}

describe('custom operators', () => {
  let testScheduler: TestScheduler

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) =>
      expect(actual).toEqual(expected)
    )
  })

  test('verify passcode passes', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const values = { a: 1 }
      const PASSCODE = [1, 1, 1, 1]
      const source = cold('-a-a-a-a', values)
      const expected = '   -------T'
      expectObservable(source.pipe(verifyPasscode(PASSCODE))).toBe(
        expected,
        BOOLEANS
      )
    })
  })

  test('verify password never emits', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const values = { a: 1 }
      const PASSCODE = [1, 1, 1, 1]
      const source = cold('-a', values)
      const expected = '   --'
      expectObservable(source.pipe(verifyPasscode(PASSCODE))).toBe(
        expected,
        BOOLEANS
      )
    })
  })

  test('verify passcode fails after 4 incorrect values', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const values = { a: 1, b: 2 }
      const PASSCODE = [1, 1, 1, 1]
      const source = cold('-b-b-c-d', values)
      const expected = '   -------F'
      expectObservable(source.pipe(verifyPasscode(PASSCODE))).toBe(
        expected,
        BOOLEANS
      )
    })
  })

  test('verify passcode fails twice after 8 incorrect values', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const values = { a: 1, b: 2 }
      const PASSCODE = [1, 1, 1, 1]
      const source = cold('-b-b-c-d-a-b-a-a', values)
      const expected = '   -------F-------F'
      expectObservable(source.pipe(verifyPasscode(PASSCODE))).toBe(
        expected,
        BOOLEANS
      )
    })
  })
})
