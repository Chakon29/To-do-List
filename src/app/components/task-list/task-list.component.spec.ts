import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { TaskService } from '../../services/task.service';
import { of, BehaviorSubject } from 'rxjs';
import { Component, Input } from '@angular/core';

// Mock del componente TaskItem
@Component({
  selector: 'app-task-item',
  template: ''
})
class MockTaskItemComponent {
  @Input() task: any;
}

// Mock del componente AddTask
@Component({
  selector: 'app-add-task',
  template: ''
})
class MockAddTaskComponent {}

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let tasksSubject: BehaviorSubject<any[]>;
  let completedTasksSubject: BehaviorSubject<number>;
  let pendingTasksSubject: BehaviorSubject<number>;

  // Configuracion inicial antes de cada prueba
  beforeEach(async () => {
    tasksSubject = new BehaviorSubject<any[]>([]);
    completedTasksSubject = new BehaviorSubject<number>(0);
    pendingTasksSubject = new BehaviorSubject<number>(0);
    
    // Creacion de un spy para TaskService con metodos mockeados
    const spy = jasmine.createSpyObj('TaskService', [
      'getTasks', 
      'addTask', 
      'toggleTaskCompletion', 
      'deleteTask', 
      'updateTask',
      'getCompletedTasksCount',
      'getPendingTasksCount'
    ]);
    spy.getTasks.and.returnValue(tasksSubject.asObservable());
    spy.getCompletedTasksCount.and.returnValue(completedTasksSubject.asObservable());
    spy.getPendingTasksCount.and.returnValue(pendingTasksSubject.asObservable());
    
    // Configuracion del TestBed para inyectar dependencias y componentes mockeados
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        MatListModule,
        MatDividerModule,
        TaskListComponent
      ],
      declarations: [MockTaskItemComponent, MockAddTaskComponent],
      providers: [
        { provide: TaskService, useValue: spy }
      ]
    }).compileComponents();

    taskServiceSpy = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verifica que el componente se crea correctamente
  it('Deberia crearse', () => {
    expect(component).toBeTruthy();
  });

  // Verifica que se llama a addTask del servicio al agregar una tarea
  it('Deberia llamar a addTask cuando se llama a onTaskAdded', () => {
    component.onTaskAdded('Nueva Tarea');
    expect(taskServiceSpy.addTask).toHaveBeenCalledWith('Nueva Tarea');
  });

  // Verifica que se llama a toggleTaskCompletion del servicio al completar una tarea
  it('Deberia llamar a toggleTaskCompletion cuando se llama a onTaskCompleted', () => {
    component.onTaskCompleted(1);
    expect(taskServiceSpy.toggleTaskCompletion).toHaveBeenCalledWith(1);
  });

  // Verifica que se llama a deleteTask del servicio al eliminar una tarea
  it('Deberia llamar a deleteTask cuando se llama a onTaskDeleted', () => {
    component.onTaskDeleted(1);
    expect(taskServiceSpy.deleteTask).toHaveBeenCalledWith(1);
  });

  // Verifica que se llama a updateTask del servicio al editar una tarea
  it('Deberia llamar a updateTask cuando se llama a onTaskEdited', () => {
    const updatedTask = { id: 1, title: 'Tarea actualizada', completed: false };
    component.onTaskEdited(updatedTask);
    expect(taskServiceSpy.updateTask).toHaveBeenCalledWith(updatedTask);
  });

  // Verifica que se muestra el mensaje de no hay tareas cuando la lista esta vacia
  it('Deberia mostrar mensaje cuando no hay tareas', fakeAsync(() => {
    tasksSubject.next([]);
    
    tick();
    fixture.detectChanges();

    const noTasksMessage = fixture.nativeElement.querySelector('.no-tasks-message');
    expect(noTasksMessage).toBeTruthy();
    expect(noTasksMessage.textContent).toContain('No hay tareas pendientes');
  }));
});