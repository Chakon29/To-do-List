import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TaskService, Task } from './task.service';
import { PLATFORM_ID } from '@angular/core';

describe('TaskService', () => {
  let service: TaskService;
  let localStorageMock: { [key: string]: string } = {};

  // Configuracion inicial antes de cada prueba
  beforeEach(() => {
    localStorageMock = {};
    
    // Mock de localStorage.getItem
    spyOn(localStorage, 'getItem').and.callFake((key: string): string | null => {
      return localStorageMock[key] || null;
    });
    // Mock de localStorage.setItem
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): void => {
      localStorageMock[key] = value;
    });
    // Mock de localStorage.clear
    spyOn(localStorage, 'clear').and.callFake((): void => {
      localStorageMock = {};
    });
    // Mock de localStorage.removeItem
    spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
      delete localStorageMock[key];
    });

    // Configuracion del TestBed para inyectar dependencias
    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: PLATFORM_ID, useValue: 'browser' } // Simula que estamos en un entorno de navegador
      ]
    });
  });

  // Verifica que el servicio se crea correctamente
  it('Deberia crearse', () => {
    service = TestBed.inject(TaskService);
    expect(service).toBeTruthy();
  });

  // Verifica que se puede agregar una tarea
  it('Deberia agregar una tarea', fakeAsync(() => {
    service = TestBed.inject(TaskService);
    let tasks: Task[] = [];
    service.getTasks().subscribe(t => tasks = t);
    service.addTask('Tarea de prueba');
    tick();
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Tarea de prueba');
  }));

  // Verifica que se puede actualizar una tarea
  it('Deberia actualizar una tarea', fakeAsync(() => {
    service = TestBed.inject(TaskService);
    service.addTask('Tarea de prueba');
    tick();
    let tasks: Task[] = [];
    service.getTasks().subscribe(t => tasks = t);
    const updatedTask: Task = { ...tasks[0], title: 'Tarea actualizada' };
    service.updateTask(updatedTask);
    tick();
    expect(tasks[0].title).toBe('Tarea actualizada');
  }));

  // Verifica que se puede eliminar una tarea
  it('Deberia eliminar una tarea', fakeAsync(() => {
    service = TestBed.inject(TaskService);
    service.addTask('Tarea de prueba');
    tick();
    let tasks: Task[] = [];
    service.getTasks().subscribe(t => tasks = t);
    const taskId = tasks[0].id;
    service.deleteTask(taskId);
    tick();
    expect(tasks.length).toBe(0);
  }));

  // Verifica que se puede cambiar el estado de completado de una tarea
  it('Deberia cambiar el estado de completado de una tarea', fakeAsync(() => {
    service = TestBed.inject(TaskService);
    service.addTask('Tarea de prueba');
    tick();
    let tasks: Task[] = [];
    service.getTasks().subscribe(t => tasks = t);
    const taskId = tasks[0].id;
    service.toggleTaskCompletion(taskId);
    tick();
    expect(tasks[0].completed).toBe(true);
  }));

  // Verifica que las tareas se persisten en localStorage
  it('Deberia persistir las tareas en localStorage', fakeAsync(() => {
    service = TestBed.inject(TaskService);
    service.addTask('Tarea de prueba');
    tick();
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    expect(storedTasks.length).toBe(1);
    expect(storedTasks[0].title).toBe('Tarea de prueba');
  }));

  // Verifica que las tareas se cargan desde localStorage al inicializar
  it('Deberia cargar tareas desde localStorage al inicializar', fakeAsync(() => {
    const initialTasks: Task[] = [{ id: 1, title: 'Tarea inicial', completed: false }];
    localStorageMock['tasks'] = JSON.stringify(initialTasks);
    
    // Crear una nueva instancia del servicio para que se inicialice con los datos mock
    service = TestBed.inject(TaskService);
    
    let loadedTasks: Task[] = [];
    service.getTasks().subscribe(tasks => {
      loadedTasks = tasks;
    });
    tick();
    
    expect(loadedTasks.length).toBe(1, 'Deberia haber una tarea cargada');
    expect(loadedTasks[0]?.title).toBe('Tarea inicial', 'El titulo de la tarea deberia ser "Tarea inicial"');
  }));

  // Verifica que no se puede actualizar una tarea inexistente
  it('No deberia actualizar una tarea inexistente', fakeAsync(() => {
    service = TestBed.inject(TaskService);
    service.addTask('Tarea existente');
    tick();
    let tasks: Task[] = [];
    service.getTasks().subscribe(t => tasks = t);
    const nonExistentTask: Task = { id: 999, title: 'Tarea inexistente', completed: false };
    service.updateTask(nonExistentTask);
    tick();
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Tarea existente');
  }));

  // Verifica que no se puede cambiar el estado de completado de una tarea inexistente
  it('No deberia cambiar el estado de completado de una tarea inexistente', fakeAsync(() => {
    service = TestBed.inject(TaskService);
    service.addTask('Tarea de prueba');
    tick();
    let tasks: Task[] = [];
    service.getTasks().subscribe(t => tasks = t);
    service.toggleTaskCompletion(999);
    tick();
    expect(tasks[0].completed).toBe(false);
  }));

  // Verifica que el servicio maneja correctamente localStorage vacio
  it('Deberia manejar correctamente localStorage vacio', fakeAsync(() => {
    // En lugar de asignar null, eliminamos la propiedad
    delete localStorageMock['tasks'];
    
    // Crear una nueva instancia del servicio con localStorage vacio
    service = TestBed.inject(TaskService);
    
    let loadedTasks: Task[] = [];
    service.getTasks().subscribe(tasks => {
      loadedTasks = tasks;
    });
    tick();
    
    expect(loadedTasks.length).toBe(0, 'No deberia haber tareas cargadas');
  }));

  // Verifica que el servicio maneja correctamente la ejecucion en un entorno no navegador
  it('Deberia manejar correctamente la ejecucion en un entorno no navegador', fakeAsync(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: PLATFORM_ID, useValue: 'server' }
      ]
    });
    service = TestBed.inject(TaskService);
    service.addTask('Tarea de prueba');
    tick();
    // No deberia lanzar error, simplemente no hacer nada con localStorage
    expect(localStorage.setItem).not.toHaveBeenCalled();
  }));

  // Verifica que el servicio se resetea correctamente
  it('Deberia resetear el servicio correctamente', fakeAsync(() => {
    service = TestBed.inject(TaskService);
    service.addTask('Tarea de prueba');
    tick();
    service.resetService();
    let tasks: Task[] = [];
    service.getTasks().subscribe(t => tasks = t);
    tick();
    expect(tasks.length).toBe(0);
    expect(localStorage.removeItem).toHaveBeenCalledWith('tasks');
  }));
});