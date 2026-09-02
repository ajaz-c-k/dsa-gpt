# Binary Search

## Definition

Binary Search is an efficient searching algorithm used to find a target value in a sorted array.

Instead of checking every element one by one, Binary Search repeatedly divides the search space into half.

## How It Works

1. Start with two pointers:
   - `left` points to the first element.
   - `right` points to the last element.

2. Find the middle element.

3. Compare the middle element with the target.

4. If the middle element equals the target, we found the answer.

5. If the target is smaller than the middle element, search the left half.

6. If the target is larger than the middle element, search the right half.

7. Repeat until the target is found or the search space becomes empty.

## Example

Array:

[1, 3, 5, 7, 9, 11]

Target:

9

First middle element is 5.

Since 9 > 5, we ignore the left half.

Now search:

[7, 9, 11]

The middle element is 9, so we found the target.

## Time Complexity

O(log n)

Each step removes approximately half of the remaining elements.

## Space Complexity

O(1) for the iterative approach.

## Important Condition

Binary Search normally requires the array to be sorted.

## Common Pattern

Binary Search is useful when:

- The data is sorted.
- We need to efficiently find a value.
- We can eliminate half of the search space after each comparison.