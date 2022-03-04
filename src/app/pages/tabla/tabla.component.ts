import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},

];

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})

export class TablaComponent implements AfterViewInit {

  constructor(public dialog: MatDialog) { }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator)
   paginator!: MatPaginator;



   ngAfterViewInit() : void {
    this.dataSource.paginator = this.paginator;
  }

  addData(){
    console.log('hola 1');
  }

  removeData(){
    console.log('hola 2');
  }



  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.width = '60%';
    dialogConfig.autoFocus  = false;


    const dialogRef = this.dialog.open(DialogContentExampleDialog,dialogConfig);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog implements OnInit  {

  form: FormGroup | any



  constructor (
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.setForm()
  }


  setForm() {
    this.form = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      questions: this.fb.array([])
    })
  }




  async create() {
    this.form.markAllAsTouched()

    if (this.form.invalid) {
      return alert('Ingresa los datos como se indica.')
    }

    alert('Encuesta creada exitosamente.')

    console.log('Data', this.form.value)

    this.setForm()
  }


  addQuestion() {
    const questions: FormArray = this.form.get('questions') as FormArray

    questions.push(this.fb.group({
      title: [null, [Validators.required]],
      type: [1, [Validators.required]],
      options: this.fb.array([])
    }))

    const question: FormGroup = questions.controls[(questions.length - 1)] as FormGroup

    question.get('type')?.valueChanges.subscribe(type => {
      const options: FormArray = question.get('options') as FormArray

      while (options.length !== 0) {
        options.removeAt(0)
      }

      switch (type) {
        case '2':
          options.push(this.fb.group({
            title: [null, [Validators.required]],
            typeOP:[true, [Validators.required]]
          }))

          question.get('options')?.setValidators([Validators.required])
          question.get('options')?.updateValueAndValidity()
          break

        case '3':
          options.push(this.fb.group({
            title: 'Si'
          }))

          options.push(this.fb.group({
            title: 'No'
          }))

          question.get('options')?.setValidators([Validators.required])
          question.get('options')?.updateValueAndValidity()
          break

        default:
          question.get('options')?.clearValidators()
          question.get('options')?.updateValueAndValidity()
          break
      }
    })
  }

  removeQuestion(qI: number) {
    const questions: FormArray = this.form.get('questions') as FormArray

    questions.removeAt(qI)
  }

  addOption(qI: number) {
    const questions: FormArray = this.form.get('questions') as FormArray
    const options: FormArray = questions.controls[qI].get('options') as FormArray

    options.push(this.fb.group({
      title: [null, [Validators.required]],
      typeOP:[true, [Validators.required]]
    }))
    console.log(options);
  }

  removeOption(qI: number, oI: number) {
    const questions: FormArray = this.form.get('questions') as FormArray
    const options: FormArray = questions.controls[qI].get('options') as FormArray

    options.removeAt(oI)
  }



}
