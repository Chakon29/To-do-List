import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = []; // Lista de tareas
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]); // Subject para emitir la lista de tareas
  private isBrowser: boolean; // Indica si el codigo se esta ejecutando en el navegador

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId); // Verifica si el codigo se esta ejecutando en el navegador
    this.loadTasks(); // Carga las tareas desde el almacenamiento local
  }

  // Metodo para obtener las tareas como un Observable
  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  // Metodo para agregar una nueva tarea
  addTask(title: string): void {
    const newTask: Task = {
      id: Date.now(), // Genera un ID unico basado en la fecha actual
      title,
      completed: false
    };
    this.tasks.push(newTask); // Agrega la nueva tarea a la lista
    this.updateTasks(); // Actualiza la lista de tareas
  }

  // Metodo para actualizar una tarea existente
  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask; // Actualiza la tarea en la lista
      this.updateTasks(); // Actualiza la lista de tareas
    }
  }

  // Metodo para eliminar una tarea
  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId); // Filtra la tarea eliminada de la lista
    this.updateTasks(); // Actualiza la lista de tareas
  }

  // Metodo para alternar el estado de completado de una tarea
  toggleTaskCompletion(taskId: number): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed; // Alterna el estado de completado
      this.updateTasks(); // Actualiza la lista de tareas
    }
  }

  // Metodo privado para actualizar la lista de tareas y guardarlas en el almacenamiento local
  private updateTasks(): void {
    this.tasksSubject.next([...this.tasks]); // Emite la lista de tareas actualizada
    this.saveTasks(); // Guarda las tareas en el almacenamiento local
  }

  // Metodo privado para guardar las tareas en el almacenamiento local
  private saveTasks(): void {
    if (this.isBrowser) {
      localStorage.setItem('tasks', JSON.stringify(this.tasks)); // Guarda las tareas en el almacenamiento local
    }
  }

  // Metodo privado para cargar las tareas desde el almacenamiento local
  private loadTasks(): void {
    if (this.isBrowser) {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks); // Carga las tareas desde el almacenamiento local
        this.tasksSubject.next([...this.tasks]); // Emite la lista de tareas cargada
      } else {
        // Si no hay tareas almacenadas, inicializamos con un array vacio
        this.tasks = [];
        this.tasksSubject.next([]);
      }
    }
  }

  // Metodo para reiniciar el estado del servicio (util para pruebas)
  resetService(): void {
    this.tasks = []; // Reinicia la lista de tareas
    this.tasksSubject.next([]); // Emite una lista de tareas vacia
    if (this.isBrowser) {
      localStorage.removeItem('tasks'); // Elimina las tareas del almacenamiento local
    }
  }
}