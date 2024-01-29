# Intro

There are a few ways to be notified about the occurrence of an error:

- The Observer's error handler.
- The catchError operator.
- The `retry()` and `retryWhen()` operators.

!NOTE: when an error occurs the Observable has ended. Observers will NOT receive any further notifications, including the completion notification.

## Example

```
const observable = new Observable((observer: Observer<number>) => {
  throw new Error('Oops!')
  observer.next(1)
});

observable.subscribe({
  next: (value) => console.log(value),
  error: (e) => console.error(e),
  complete: () => console.log('complete')
})
```

As expected, the error function is invoked with the error value, which we are then using console.error() to log the error.
When we run this code we should see a single error message displaying in the console.

