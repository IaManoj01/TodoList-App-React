# TodoList App - React

This project is a simple Todo List application built using React. Below are some frequently asked questions and their answers to help you understand the code and concepts better.

---

## **1. What does the `...` operator do in JavaScript?**

The `...` operator in JavaScript is called the **spread operator**. It is used to "spread" the elements of an array, object, or iterable into individual elements. For example:

```javascript
const arr = [1, 2, 3];
const newArr = [...arr, 4]; // [1, 2, 3, 4]
```

In the context of this project, the `...` operator is used to spread the existing `todos` array and add a new todo object:

```javascript
setTodos([...todos, { todo, isCompleted: false }]);
```
This ensures that the new todo is appended to the existing list without modifying the original array.

---

## **2. What happens if the `todos` state is initialized as `['hi']`?**

If the `todos` state is initialized as `['hi']`, the initial value of `todos` is an array of strings. When you call `todos.map()` and try to access `item.todo`, it will throw an error because strings do not have a `todo` property.

To avoid this, ensure that the `todos` array always contains objects with the expected structure. For example:

```javascript
const [todos, setTodos] = useState([{ todo: 'hi', isCompleted: false }]);
```
Alternatively, you can add a check in the `map` function to handle cases where the array might contain strings:

```javascript
{todos.map((item, index) => {
  if (typeof item === 'string') {
    return <div key={index}>{item}</div>;
  }
  return <div key={index}>{item.todo}</div>;
})}
```

---

## **3. How does `map` work with multiple parameters like `(item, index)`?**

The `Array.prototype.map()` function can take up to three arguments in its callback function:

```javascript
array.map((currentValue, index, array) => {
  // Your logic here
});
```

- **`currentValue`**: The current element being processed in the array (e.g., `item` in your code).
- **`index`**: The index of the current element being processed.
- **`array`**: The array `map()` was called on (optional).

### Examples:

1. **Basic Example with One Parameter**:
   ```javascript
   const arr = [1, 2, 3, 4];
   const doubled = arr.map((num) => num * 2);
   console.log(doubled); // [2, 4, 6, 8]
   ```

2. **Using `index`**:
   ```javascript
   const arr = ['a', 'b', 'c', 'd'];
   const indexed = arr.map((letter, index) => `${index}: ${letter}`);
   console.log(indexed); // ['0: a', '1: b', '2: c', '3: d']
   ```

3. **Using `array`**:
   ```javascript
   const arr = [10, 20, 30];
   const result = arr.map((num, index, array) => {
     return num + (array[index - 1] || 0); // Add the previous element (if it exists)
   });
   console.log(result); // [10, 30, 50]
   ```

In your code:
```javascript
{todos.map((item, index) => {
  return (
    <div key={index}>
      {item.todo}
    </div>
  );
})}
```
- **`item`**: Represents the current object in the `todos` array.
- **`index`**: Represents the position of the current object in the `todos` array.

---

Feel free to explore and modify the code to learn more about React and JavaScript!
