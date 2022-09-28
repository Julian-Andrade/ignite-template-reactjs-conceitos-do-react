import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (newTaskTitle) {
      // constante com os dados solicitados na interface
      // id -> random com math.floor e math.random
      // isComplete -> começa false por causa que a task não foi concluída
      const newTask = {
        id: Math.floor(Math.random() * 1000),
        title: newTaskTitle,
        isComplete: false,
      };
      
      // setTasks -> adicionamos a constante newTask junto com as tasks antigas (...oldTask)
      setTasks((oldTask) => [...oldTask, newTask]);

      // setNewTaskTitle("") -> Limpamos o input após envio do formulário
      setNewTaskTitle("");
    } else {
      // se newTaskTitle não for true, a aplicação retorna (para)
      return;
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    // setTasks -> mapeamos as tasks criadas, quando encontrar o id identico
    //             e a task for concluída (checked), converte isComplete para true,
    //             se não for concluída a task não sofre mudança e continua igual
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    // setTasks -> filtramos as tasks listadas e retorna a lista que diferente do id selecionado
    setTasks(
      tasks.filter((task) => {
        return task.id !== id;
      })
    );
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}