# Testing

## TestScheduler

The TestScheduler class is part of the rxjs/testing module, and enables synchronous testing of asynchronous, or synchronous, Observables.

- run(): the primary method. This method is invoked with a callback function, which receives a RunHelpers object.

```
export interface RunHelpers {
  cold: typeof TestScheduler.prototype.createColdObservable;
  hot: typeof TestScheduler.prototype.createHotObservable;
  flush: typeof TestScheduler.prototype.flush;
  expectObservable: typeof TestScheduler.prototype.expectObservable;
  expectSubscriptions: typeof TestScheduler.prototype.expectSubscriptions;
}
````

- expectObservable() provides the setup for an assertion of an actual Observable, and returns an object that contains a single toBe property. The toBe property is a function that accepts the marbles string as the first argument along with an optional values argument in order to assert the actual Observable to the expected result described in the marbles syntax.
- expectSubscriptions() provides the setup for an assertion of an actual Observable, and returns an object that contains a single toBe property. The toBe property is a function that accepts the marbles string and asserts the actual Observable's subscription occurrences to those that are described in the marbles syntax.
- cold() provides a cold observable that emits notification(s) upon subscription. The marble syntax string defines the sequencing of notifications. And, we can optionally specify the values of each notification using either an object or an array.
- hot() provides a hot observable. The primary distinction between a cold and hot observable when testing is the ability to test for notification upon subscribing.
- flush() provides the ability to manually execute the scheduled assertions created using either the expectObservable() or expectSubscription function.

