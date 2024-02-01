# Creating a Custom Operator
There are two distinct approaching for creating a custom RxJS operator:

1. Use the pipe() function to create a new operator using existing operators.
2. Create a higher-order function that returns a function that is invoked with the source Observable and returns a new Observable.

## pipe()
#### The pipe() function provides the ability to combine existing operators together to create a new operator.

- is a simpler;
- uses existing operators;
- we can encapsulate the necessary behavior and logic into a new operator;
- RxJS provides many operators, and it is probably likely that we can create our new custom operator by using one more of existing operators to achieve the desired result.


## Higher-order Functions

> A higher-order function is a function that does at least one of the following: takes one or more functions as arguments (i.e. procedural parameters), returns a function as its result.

Similar to a higher-order function, a higher-order Observable is an Observable that emits one or more Observables.
