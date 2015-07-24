#BM-Random

This module provides some useful functions that uses random.
##Installation
```
$ npm install bm-random
```
##API:

####fromArray
```
.fromArray(array: array<any>): any
```
Returns a random element of `array` or `undefined` if `array` is empty

####fromRange
```
.fromRange(min: number, max: number, step: number = 1): number
.fromRange(options: { min: number, max: number, step: number = 1 })
```
_Preconditions:_
- _`max` should be greater than or equal to `min`_
- _`step` should be positive_
- _the difference between `max` and `min` should be a multiple of `step`_

Returns a random number in \[`min`; `max`\] whose distance from `min` is a multiple of `step`

####neutral
```
.neutral(n: number): number
```
_Preconditions:_
- _`n` should be a neutral number_

Returns a neutral number that is lesser than `n`
