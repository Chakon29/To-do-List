import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TaskItemComponent } from '../task-item/task-item.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskService, Task } from '../../services/task.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatProgressBarModule,
    TaskItemComponent,
    AddTaskComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks$: Observable<Task[]>; // Observable que emite la lista de tareas

  private destroy$ = new Subject<void>(); // Subject para manejar la destruccion del componente

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.getTasks(); // Asigna el Observable de tareas desde el servicio de tareas
  }

  // Metodo que se ejecuta al inicializar el componente
  ngOnInit() {
    // No es necesario suscribirse aqui ya que usamos el async pipe en el template
  }

  // Metodo que se ejecuta al destruir el componente
  ngOnDestroy() {
    this.destroy$.next(); // Emite un valor en el Subject para indicar la destruccion
    this.destroy$.complete(); // Completa el Subject
  }

  // Metodo que se llama cuando se agrega una nueva tarea
  onTaskAdded(title: string) {
    this.taskService.addTask(title); // Llama al metodo addTask del servicio de tareas
  }

  // Metodo que se llama cuando se completa una tarea
  onTaskCompleted(taskId: number) {
    this.taskService.toggleTaskCompletion(taskId); // Llama al metodo toggleTaskCompletion del servicio de tareas
  }

  // Metodo que se llama cuando se elimina una tarea
  onTaskDeleted(taskId: number) {
    this.taskService.deleteTask(taskId); // Llama al metodo deleteTask del servicio de tareas
  }

  // Metodo que se llama cuando se edita una tarea
  onTaskEdited(task: Task) {
    this.taskService.updateTask(task); // Llama al metodo updateTask del servicio de tareas
  }
}