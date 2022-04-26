import { Injectable } from '@angular/core';
import { List } from '../interfaces/list.interface';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private _list: List[] = [];

  constructor() { }

  /**
   * @name list
   */
  get list(){
    return this._list;
  }

  /**
   * @name toggleStatus
   * @param item 
   */
  toggleStatus(item: List){
    try{
      item.isDone = !item.isDone;
    } catch(err){
      throw(err)
    }
  }

  async addListItem(item: List){
    try{
      await this._list.push(item)
    } catch(err){
      throw(err)
    }
  }
}
