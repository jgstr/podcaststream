export function createStack(capacity){

    return {
        values: [],
        size: 0,
        capacity
    };

}

export function push(stack, value) {

    if (stack.size === stack.capacity) {
        throw new Error("Can't push when at capacity.");
    }

    return copyStack(stack, stack.size+1, [...stack.values, value]);
}

/**
 *
 * @param stack is the stack object.
 * @returns {any[]} an array with a copied and modified stack object and the popped value.
 */
export function pop(stack) {

    if (stack.size === 0) {
        throw new Error("Can't pop when empty.");
    }

    return [
            copyStack(stack, stack.size-1, ...stack.values.slice(0,stack.values.length-1)),
            stack.values[stack.values.length-1]
        ];


}

// This is an example of refactoring. We took the Object.assign() function used in push and pop and created something
// easier to understand and more useful for our purposes.
const copyStack = function (stack, newSize, newValues) {

    return Object.assign({}, stack, { size: newSize, values: newValues });

};

