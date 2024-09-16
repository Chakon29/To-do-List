import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Task } from '../../services/task.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule
  ],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task!: Task; // Tarea que se muestra en el componente
  @Output() taskCompleted = new EventEmitter<number>(); // Evento que se emite cuando se completa una tarea
  @Output() taskDeleted = new EventEmitter<number>(); // Evento que se emite cuando se elimina una tarea
  @Output() taskEdited = new EventEmitter<Task>(); // Evento que se emite cuando se edita una tarea

  isEditing = false; // Indica si la tarea esta en modo edicion
  editedTitle = ''; // Titulo editado de la tarea

  // Metodo para completar una tarea
  onCompleteTask() {
    this.taskCompleted.emit(this.task.id);
  }

  // Metodo para eliminar una tarea
  onDeleteTask() {
    this.taskDeleted.emit(this.task.id);
  }

  // Metodo para iniciar la edicion de una tarea
  startEditing() {
    this.isEditing = true;
    this.editedTitle = this.task.title;
  }

  // Metodo para guardar los cambios de una tarea editada
  saveEdit() {
    if (this.editedTitle.trim() !== '') {
      this.taskEdited.emit({ ...this.task, title: this.editedTitle.trim() });
      this.isEditing = false;
    }
  }

  // Metodo para cancelar la edicion de una tarea
  cancelEdit() {
    this.isEditing = false;
  }
}