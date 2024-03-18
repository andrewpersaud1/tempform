import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';

@Component({
  selector: 'new-course-form',
  templateUrl: './new-course-form.component.html',
  styleUrl: './new-course-form.component.scss'
})
export class NewCourseFormComponent {
  form;

    constructor(fb: FormBuilder){
      this.form= fb.group({
        name: ['', Validators.required],
        contact: fb.group({
          email: [],
          phone: []
        }),
        topics: fb.array([])
      })

    }

}
