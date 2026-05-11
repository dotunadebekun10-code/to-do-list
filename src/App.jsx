import { useState } from 'react'
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react'

function App() {
  const initialTasks = [
    { id: 1, text: "Learn React Completely", done: false },
    { id: 2, text: "Build a To-Do List", done: false },
    { id: 3, text: "Learn useState", done: false },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");

  function toggleTask(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done }
        : task));
  }

  function addTask() {
    if (newTask.trim() === "") return;

    const newTaskObject = {
      id: Date.now(),
      text: newTask,
      done: false,
    };

    setTasks([...tasks, newTaskObject])
    setNewTask("")
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center p-6 bg-[#0f172a]'>
      <div className='w-full max-w-md mx-auto p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-blue-500/10'>
        <h1 className='text-4xl font-extrabold mb-8 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent'>
          Tasks
        </h1>

        {/* Input and Button */}
        <div className='flex gap-2 mb-8'>
          <input 
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder='Add a task...'
            className='flex-1 bg-white/5 border border-white/10 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white placeholder-white/30'
          />
          <button 
            onClick={addTask}
            className='bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-xl transition-all active:scale-95 flex items-center justify-center'
          >
            <Plus size={24} />
          </button>
        </div>

        {/* List of tasks */}
        <ul className='space-y-3'>
          {tasks.map((task) => (
            <li 
              key={task.id}
              className='group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 transition-all hover:bg-white/10 hover:border-white/10'
            >
              <div 
                className='flex items-center gap-3 cursor-pointer flex-1'
                onClick={() => toggleTask(task.id)}
              >
                {task.done ? (
                  <CheckCircle2 className='text-emerald-400' size={20} />
                ) : (
                  <Circle className='text-white/30 group-hover:text-white/50' size={20} />
                )}
                <span className={`text-lg transition-all ${task.done ? 'text-white/30 line-through' : 'text-white/90'}`}>
                  {task.text}
                </span>
              </div>
              <button 
                onClick={() => deleteTask(task.id)}
                className='text-white/20 hover:text-red-400 p-2 rounded-lg transition-colors'
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
          {tasks.length === 0 && (
            <p className='text-center text-white/20 py-8 italic'>No tasks yet. Add one above!</p>
          )}
        </ul>
      </div>
    </div>
  )
}

export default App
