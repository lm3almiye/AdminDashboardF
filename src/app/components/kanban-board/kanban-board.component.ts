import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { ColumnService } from '../../service/column.service';
import { Tache, TacheDto } from '../../../types';
import { environment } from '../../environment/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {
  columns: any[] = [];
  tasks: TacheDto[] = [];
  visible: boolean = false;
  tacheForm = new FormGroup({
    name: new FormControl('', Validators.required),
    deadline: new FormControl('', Validators.required),
    utilisateurId: new FormControl('', Validators.required),
  });
  elementBeingDragged: TacheDto | null = null;
  showTaskForm = false;

  constructor(private taskService: TaskService, private columnService: ColumnService) {}

  ngOnInit() {
    this.loadColumnsAndTasks();
  }
  showDialog()
  {
    this.visible = true;
  }
  loadColumnsAndTasks() {
    this.columnService.getAll(environment.apiUrl).subscribe(columns => {
      this.columns = columns;
    });

    this.taskService.getAll(environment.apiUrl).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  getTasksForColumn(columnId: number) {
    return this.tasks.filter(task => task.columnId === columnId);
  }

  dragStart(event: DragEvent, task: TacheDto) {
    this.elementBeingDragged = task;
    event.dataTransfer?.setData('text', JSON.stringify(task));
  }

  dragEnd(event: DragEvent) {
    this.elementBeingDragged = null;
  }

  drop(event: DragEvent, columnId: number) {
    event.preventDefault();
    if (this.elementBeingDragged) {
      const taskToUpdate = { ...this.elementBeingDragged, columnId }; // Update the columnId
      this.taskService.update(environment.apiUrl, taskToUpdate.id, taskToUpdate).subscribe(() => {
        this.loadColumnsAndTasks();  // Refresh tasks after update
        this.elementBeingDragged = null;
      });
    }
  }
  

  dragOver(event: DragEvent) {
    event.preventDefault();  // Necessary to allow the drop
  }

  openNewTaskForm() {
    this.showTaskForm = true;
  }
   parseDateWithCurrentTime(dateString: string): Date {
    const [day, month, year] = dateString.split('/').map(Number);
    const now = new Date();
    return new Date(year, month - 1, day, now.getHours(), now.getMinutes(), now.getSeconds());
  }

  createTask() {
    const deadlineWithTime = this.parseDateWithCurrentTime(this.tacheForm.value.deadline!);
    const newTask: Tache = {
      name: this.tacheForm.value.name!,
      deadline: deadlineWithTime,
      utilisateurId: parseInt(this.tacheForm.value.utilisateurId!),
      columnId: 1  // Default column ID or dynamically set based on form data
    };
    console.log(newTask.deadline);
    this.taskService.add(environment.apiUrl, newTask).subscribe(() => {
      this.showTaskForm = false;
      this.loadColumnsAndTasks();  // Refresh tasks after creation
    });
    this.visible = false;
  }
  deleteTask(taskToDeleteId: number){
    this.taskService.removeById(environment.apiUrl, taskToDeleteId!).subscribe(() => {
      console.log("deleted successfuly");
      this.loadColumnsAndTasks();
    });
  }
}
