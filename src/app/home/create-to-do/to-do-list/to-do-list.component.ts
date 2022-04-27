import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { List } from '../../interfaces/list.interface';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListComponent implements OnInit {
  @Input('list') todoList: List[];
  @Output('changeStatus') changeStatus = new EventEmitter<any>();

  constructor(
    private _snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // this.todoList = this._listService._list;
  }

  /**
   * @name checkItemExistance
   * @returns 
   */
   public checkItemExistance(){
    return this.todoList.find((elm) => elm.isDone == false) 
  }

   /**
   * @name toggleStatus
   * @param listItem 
   */
  toggleStatus(listItem: List){
    try{
      this._snackBar.open('Loading')
      setTimeout(() => {
        //find item & change status
        let item = this.todoList.find((elm) => elm.id == listItem.id)
        if(item){
          item.isDone = !item.isDone;
        }

        //emmiting data
        this.changeStatus.emit(this.todoList);

        this.cdRef.markForCheck();
        this._snackBar.dismiss()
      }, 500);
      
    } catch(err){
      console.log(err)
      alert('Some error occured.')
    }
  }
}
