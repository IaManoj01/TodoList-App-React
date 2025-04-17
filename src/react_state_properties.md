# React State and Immutability

## Question 1: Why does `setTodos(newTodos)` have no effect when using `let newTodos = todos;`?

### Answer:
When you do `let newTodos = todos;`, `newTodos` is just a reference to the same array in memory as `todos`. Any changes made to `newTodos` directly modify the original `todos` array. However, React does not detect this change because the **reference to the array remains the same**.

React uses **shallow comparison** to determine if the state has changed. If the reference to the state (in this case, the `todos` array) is the same as before, React assumes that nothing has changed and skips the re-render.

### Key Rule in React:
React state must be updated **immutably**. This means you should create a new object or array when updating the state, rather than modifying the existing one.

### Example of the Problem:
```javascript
let todos = [{ id: 1, isCompleted: false }];
let newTodos = todos; // newTodos points to the same array as todos
newTodos[0].isCompleted = true; // Mutates the original array
setTodos(newTodos); // React sees the same reference and skips re-render
```

Here, React skips the re-render because `todos` and `newTodos` point to the same array in memory.

### Correct Way (Immutable Update):
```javascript
let newTodos = [...todos]; // Creates a new array
newTodos[0] = { ...newTodos[0], isCompleted: true }; // Creates a new object for the updated item
setTodos(newTodos); // React detects the new reference and re-renders
```

### Why This Works:
1. `let newTodos = [...todos];` creates a **new array** with a new reference.
2. `newTodos[0] = { ...newTodos[0], isCompleted: true };` creates a **new object** for the updated item, ensuring immutability.
3. `setTodos(newTodos);` updates the state with a new reference, so React detects the change and re-renders the component.

---

## Question 2: What happens if `isCompleted` is in the middle of the object? Will the spread operator still work?

### Answer:
Yes, the spread operator (`...`) will still work even if `isCompleted` is in the middle of the object. The spread operator creates a shallow copy of the object and allows you to overwrite specific properties regardless of their position in the object.

### Example:
Consider the following object structure where `isCompleted` is in the middle:
```javascript
{
  id: "123",
  isCompleted: false,
  todo: "Learn React"
}
```

When you use the spread operator like this:
```javascript
newTodos[index] = { ...newTodos[index], isCompleted: !newTodos[index].isCompleted };
```

The `...newTodos[index]` copies all properties (`id`, `isCompleted`, `todo`) into the new object. Then, `isCompleted: !newTodos[index].isCompleted` overwrites the `isCompleted` property, regardless of its position in the original object.

### Result:
The new object will look like this:
```javascript
{
  id: "123",
  isCompleted: true, // Updated
  todo: "Learn React"
}
```

### Why It Works:
The spread operator does not depend on the order of properties in the object. It simply copies all properties into the new object, and any explicitly defined properties (like `isCompleted`) will overwrite the copied ones.

### Key Takeaway:
The position of `isCompleted` in the object does not matter. The spread operator will always work as expected to update the property immutably.