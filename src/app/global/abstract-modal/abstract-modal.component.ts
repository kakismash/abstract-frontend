import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-abstract-modal',
  templateUrl: './abstract-modal.component.html',
  styleUrls: ['./abstract-modal.component.css']
})
export class AbstractModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AbstractModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  getAbstract(): string {
    return this.data.abstract;
  }

}
