import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { List } from '../../interfaces/list.interface';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListComponent implements OnInit {
  public todoList: List[];

  constructor(
    private _listService: ListService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.todoList = this._listService.list;
    console.log(this.todoList)
  }

  /**
   * @name checkItemExistance
   * @returns 
   */
   public checkItemExistance(){
    return this._listService.itemExistsFromStatus(false)
  }

   /**
   * @name toggleStatus
   * @param listItem 
   */
  toggleStatus(listItem: List){
    try{
      this._snackBar.open('Loading')
      setTimeout(() => {
        this._listService.toggleStatus(listItem);
        this._snackBar.dismiss()
      }, 500)
    } catch(err){
      console.log(err)
      alert('Some error occured.')
    }
  }
}
