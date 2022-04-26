import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { List } from '../interfaces/list.interface';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-create-to-do',
  templateUrl: './create-to-do.component.html',
  styleUrls: ['./create-to-do.component.scss']
})
export class CreateToDoComponent implements OnInit {

  public todoForm: FormGroup;

  constructor(
    private listService: ListService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.onFormChanges()
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
    this.todoForm.valueChanges.subscribe((value) => {
      if(this.todoForm && this.todoForm.valid){
        this.createListItem(this.todoForm.value)
      }
    })
  }

  private async createListItem(data: any){
    try{
      const item: List = {
        title: data.title,
        description: data.description,
        repeating: data.repeating,
        isDone: false,
      }

      await this.listService.addListItem(item);
      this._snackBar.open('Task created successfully!')


    } catch(err) {
      console.log(err)
      alert('some error occured');
    }
    
  }
}
