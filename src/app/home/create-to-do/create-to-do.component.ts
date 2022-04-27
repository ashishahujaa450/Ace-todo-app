import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, Subscription } from 'rxjs';
import { List } from '../interfaces/list.interface';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-to-do',
  templateUrl: './create-to-do.component.html',
  styleUrls: ['./create-to-do.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateToDoComponent implements OnInit, OnDestroy {

  public todoForm: FormGroup;
  public todoList: List[] = [];

  private todoFormSubscription: Subscription;

  constructor(
    private _snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.setupComponent()
  }

  /**
   * @name setupComponent
   */
  private setupComponent(){
    this.initForm();
    this.onFormChanges();
  }

  /**
   * @name initForm
   */
  private initForm(){
    this.todoForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      repeating: new FormControl('', [Validators.required]),
    });
  }

  /**
   * @name onFormChanges
   */
  private onFormChanges(){
    //using debounce time in case if user select dropdown first and enter title in last so before submitting it will wait for user to finish the text in the fields
    this.todoFormSubscription = this.todoForm.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      if(this.todoForm && this.todoForm.valid){
        this.createListItem(this.todoForm.value)
      }
    })
  }

  /**
   * @name private
   * @param data 
   */
  private async createListItem(data: any){
    try{
      //create data
      const item: List = {
        title: data.title,
        description: data.description,
        repeating: data.repeating,
        isDone: false,
        id: uuidv4()
      }

      //add data into list
      await this.addListItem(item);
      //show success message
      this._snackBar.open('Task created successfully!', '', {
        duration: 3000
      })
      //resetting form
      this.todoForm.reset();
      this.cdRef.detectChanges();
    } catch(err) {
      alert('some error occured');
    }
    
  }

  /**
   * @name addListItem
   * @param item 
   */
   private async addListItem(item: List){
    try{
      this.todoList = [...this.todoList, item]
    } catch(err){
      throw(err)
    }
  }

  onStatusChange(event: any){
    this.todoList = [...event];
  }

  ngOnDestroy(): void {
    if(this.todoFormSubscription){
      //unsubsribe subscription to avoid memory leaks on destroy
      this.todoFormSubscription.unsubscribe();
    }
  }
}
