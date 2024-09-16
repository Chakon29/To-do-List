import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItemComponent } from './task-item.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  // Configuracion inicial antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        TaskItemComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.task = { id: 1, title: 'Tarea de prueba', completed: false };
    fixture.detectChanges();
  });

  // Verifica que el componente se crea correctamente
  it('Deberia crearse', () => {
    expect(component).toBeTruthy();
  });

  // Verifica que se emite el evento taskCompleted al completar una tarea
  it('Deberia emitir el evento taskCompleted cuando se hace clic en el checkbox', () => {
    spyOn(component.taskCompleted, 'emit');
    component.onCompleteTask();
    expect(component.taskCompleted.emit).toHaveBeenCalledWith(1);
  });

  // Verifica que el componente entra en modo de edicion al hacer clic en el boton de editar
  it('Deberia entrar en modo de edicion cuando se hace clic en el boton de editar', () => {
    const editButton = fixture.nativeElement.querySelector('button[aria-label="Editar tarea"]');
    editButton.click();
    expect(component.isEditing).toBe(true);
  });

  // Verifica que se puede cancelar la edicion
  it('Deberia cancelar la edicion cuando se hace clic en el boton de cancelar', () => {
    component.isEditing = true;
    component.cancelEdit();
    expect(component.isEditing).toBe(false);
  });

  // Verifica que se puede guardar la edicion y emitir el evento taskEdited
  it('Deberia guardar la edicion cuando se llama a saveEdit', () => {
    spyOn(component.taskEdited, 'emit');
    component.isEditing = true;
    component.editedTitle = 'Tarea editada';
    component.saveEdit();
    expect(component.taskEdited.emit).toHaveBeenCalledWith({ ...component.task, title: 'Tarea editada' });
    expect(component.isEditing).toBe(false);
  });

  // Verifica que se emite el evento taskDeleted al eliminar una tarea
  it('Deberia emitir el evento taskDeleted cuando se hace clic en el boton de eliminar', () => {
    spyOn(component.taskDeleted, 'emit');
    component.onDeleteTask();
    expect(component.taskDeleted.emit).toHaveBeenCalledWith(1);
  });
});