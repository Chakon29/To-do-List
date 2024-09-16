import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  @Output() taskAdded = new EventEmitter<string>(); // Evento que se emite cuando se agrega una nueva tarea
  newTaskTitle = ''; // Titulo de la nueva tarea
  // Metodo para agregar una nueva tarea
  addTask() {
    // Verifica si el titulo de la nueva tarea no esta vacio
    if (this.newTaskTitle.trim()) {
      // Emite el evento con el titulo de la nueva tarea
      this.taskAdded.emit(this.newTaskTitle.trim());
      // Limpia el campo de entrada
      this.newTaskTitle = '';
    }

  }
  
}