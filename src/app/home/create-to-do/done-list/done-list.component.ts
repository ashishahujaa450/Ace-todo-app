import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { List } from '../../interfaces/list.interface';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-done-list',
  templateUrl: './done-list.component.html',
  styleUrls: ['./done-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoneListComponent implements OnInit {

  @Input('listData') list: List[];

  public todoList: List[];

  constructor(
    private _listService: ListService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.todoList = this.list;
  }

  /**
   * @name checkItemExistance
   * @returns 
   */
  public checkItemExistance(){
    return this._listService.itemExistsFromStatus(true)
  }

  /**
   * @name toggleStatus
   * @param listItem 
   */
  public toggleStatus(listItem: List){
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
