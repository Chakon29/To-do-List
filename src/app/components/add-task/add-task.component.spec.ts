import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTaskComponent } from './add-task.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  // Configuracion inicial antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        AddTaskComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verifica que el componente se crea correctamente
  it('Deberia crearse', () => {
    expect(component).toBeTruthy();
  });

  // Verifica que se emite el evento taskAdded con una tarea valida
  it('Deberia emitir el evento taskAdded cuando se envia el formulario con una entrada valida', () => {
    spyOn(component.taskAdded, 'emit');
    component.newTaskTitle = 'Nueva Tarea';
    component.addTask();
    expect(component.taskAdded.emit).toHaveBeenCalledWith('Nueva Tarea');
    expect(component.newTaskTitle).toBe('');
  });

  // Verifica que no se emite el evento taskAdded con una tarea vacia
  it('No deberia emitir el evento taskAdded cuando se envia el formulario con una entrada vacia', () => {
    spyOn(component.taskAdded, 'emit');
    component.newTaskTitle = '';
    component.addTask();
    expect(component.taskAdded.emit).not.toHaveBeenCalled();
  });

  // Verifica que no se emite el evento taskAdded con una tarea de solo espacios
  it('No deberia emitir el evento taskAdded cuando se envia el formulario con solo espacios', () => {
    spyOn(component.taskAdded, 'emit');
    component.newTaskTitle = '   ';
    component.addTask();
    expect(component.taskAdded.emit).not.toHaveBeenCalled();
  });

  // Verifica que el formulario se renderiza correctamente
  it('Deberia renderizar el formulario de agregar tarea', () => {
    const formElement = fixture.nativeElement.querySelector('form');
    expect(formElement).toBeTruthy();
  });
});