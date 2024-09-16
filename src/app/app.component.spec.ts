import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';

// Componente mock para TaskListComponent
@Component({
  selector: 'app-task-list',
  template: ''
})
class MockTaskListComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        AppComponent
      ],
      declarations: [MockTaskListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verifica que el componente se crea correctamente
  it('Deberia crear la aplicacion', () => {
    expect(component).toBeTruthy();
  });

  // Comprueba que el titulo de la aplicacion es correcto
  it('Deberia tener como titulo "Lista de Tareas"', () => {
    expect(component.title).toEqual('Lista de Tareas');
  });

  // Verifica que el titulo se renderiza en el template
  it('Deberia renderizar el titulo', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar span')?.textContent).toContain('Lista de Tareas');
  });

  // Comprueba que el componente TaskListComponent se renderiza
  it('Deberia renderizar el componente TaskListComponent', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-task-list')).toBeTruthy();
  });
});