import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  message = 'Message: ';

  constructor(
    public ref: MatDialogRef<ErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {message: string}
  ) { }

  ngOnInit() {
    this.message = this.message + this.data.message;
  }

}
