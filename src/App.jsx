import { useEffect, useState } from 'react';
import { v4 as unqid } from 'uuid';
import Navbar from './componets/Navbar';
import './index.css';
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)


  useEffect(() => {
    // Load todos from local storage on app initialization
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      try {
        const loadedTodos = JSON.parse(todoString);
        setTodos(loadedTodos);
        // console.log("Loaded todos from localStorage:", loadedTodos);
      } catch (error) {
        console.error("Error parsing todos from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
      // console.log("Saved todos to localStorage:", todos);
    }
  }, [todos]);
  

  const handleAdd = () => {
    if(todo.trim()!=''){
      // I am using a const because let the update happen first then we set the data to todos 
      const newTodosList = [...todos, {id: unqid(), todo, isCompleted:false}];
      setTodos(newTodosList);
      console.log("Updated todos:", newTodosList); // Log the new array directly
      setTodo('');
    }
  }

  const handleEdit = (index) => {
    // console.log(todos[index].todo)
    setTodo(todos[index].todo)
    // handleDelete(index);
    // OR 
    let newTodos = todos.filter((_,i)=>i!=index)
    // console.log(newTodos)
    setTodos(newTodos)
  }

  const handleDelete = (i) => {
    let newTodos = [...todos];
    newTodos.splice(i,1);
    // OR
    // let newTodos = todos.filter((_,index)=>index!=i)
    setTodos(newTodos);
  }
  
  const handleCheckBox = (e,index) =>{
    // let id = e.target.name;
    // let index = todos.findIndex(todo=>todo.id===id);
    
    // I have passed the index directely using map function
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    // OR 
    // newTodos[index] = { ...newTodos[index], isCompleted: !newTodos[index].isCompleted }; 
    // console.log(newTodos)
    setTodos(newTodos);
  }

  const toggleFinished = ()=>{
    setshowFinished(!showFinished);
  }

  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto mx-3 my-5 p-5 rounded-xl bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-xl'>iTask Manage your tasks at one place</h1>
        <div className="addTodo my-5 flex flex-col">
          <h2 className='text-lg font-bold my-1'>Add a Todo</h2>
          <input
            type="text" className="bg-white rounded-lg w-full px-5 py-0.5 my-2" value={todo}
            onChange={(e) => setTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAdd();
              }
            }}
          />
          <button onClick={handleAdd} className='bg-purple-800 hover:bg-purple-900 p-2 py-1 text-sm font-bold rounded-md text-white'>Save</button>
        </div>

        
        <input type="checkbox" name="" id="" onChange={toggleFinished} checked={showFinished} /> Show Finished
        <h1 className='text-lg font-bold my-4'>Your Todos</h1>

        <div className="todos">
          {todos.length===0 && <div className='m-5'>No Todos to Display</div> }
          {todos.map((item, index) => {
            return (showFinished || !item.isCompleted) && (
              <div key={item.id} className='todo flex justify-between my-0.5 md:w-7/8'>
                <div className="flex gap-5">
                  <input type="checkbox" onChange={(e)=>{handleCheckBox(e,index)}} name={item.id} id="" />
                  <div className={item.isCompleted?"line-through":""}>
                  {item.todo}
                  </div>
                </div>

                <div className="buttons flex justify-center items-center h-auto">
                  <button onClick={()=>{handleEdit(index)}} className='btn-change !mx-1'><FiEdit3 /></button>
                  <button onClick={()=>{handleDelete(index)}} className='btn-change !mx-2'><MdDeleteOutline /></button>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </>
  )
}

export default App
