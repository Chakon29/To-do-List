# Lista de Tareas Angular

Este proyecto es una aplicación web simple para gestionar una lista de tareas (To-Do List) desarrollada con Angular.

## Descripción

La aplicación permite a los usuarios agregar, editar, eliminar y marcar tareas como completadas. Utiliza Angular Material para los componentes de la interfaz de usuario y localStorage para la persistencia de datos.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

- `src/app/components/`: Contiene los componentes de la aplicación
  - `add-task/`: Componente para agregar nuevas tareas
  - `task-item/`: Componente para mostrar y editar una tarea individual
  - `task-list/`: Componente principal que muestra la lista de tareas
- `src/app/services/`: Contiene el servicio para manejar la lógica de negocio
  - `task.service.ts`: Servicio para manejar las operaciones CRUD de las tareas

## Requisitos Previos

Asegúrate de tener instalado:

- Node.js (versión recomendada: 22.8.0 o superior)
- npm (versión recomendada: 10.8.1 o superior)
- Angular CLI (`npm install -g @angular/cli@18.2.4`)

## Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/Chakon29/To-do-List.git
   ```
2. Navega al directorio del proyecto:
   ```
   cd To-do-List
   ```
3. Instala las dependencias:
   ```
   npm install
   ```

## Ejecución

Para ejecutar la aplicación en modo desarrollo:

```
ng serve
```

Navega a `http://localhost:4200/` en tu navegador. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

## Pruebas Unitarias

### Ejecutar Todas las Pruebas

Para ejecutar todas las pruebas unitarias:

```
ng test
```

### Pruebas con Cobertura de Código

Para ver la cobertura de las pruebas:

```
ng test --no-watch --code-coverage
```

### Pruebas por Componente

Para ejecutar pruebas unitarias para componentes específicos:

1. AddTaskComponent:

   ```
   ng test --include=**/add-task.component.spec.ts
   ```
2. TaskItemComponent:

   ```
   ng test --include=**/task-item.component.spec.ts
   ```
3. TaskListComponent:

   ```
   ng test --include=**/task-list.component.spec.ts
   ```
4. TaskService:

   ```
   ng test --include=**/task.service.spec.ts
   ```

## Tecnologías Utilizadas

- Angular 18.2.4
- Angular Material
- RxJS 7.8.0
- Jasmine y Karma para pruebas unitarias
- localStorage para persistencia de datos

## Versiones de Dependencias

- Angular CLI: 18.2.4
- Node: 22.8.0
- Package Manager: npm 10.8.1
- TypeScript: 5.5.4
- RxJS: 7.8.1
