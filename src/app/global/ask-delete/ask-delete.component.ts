import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from 'src/app/model/article.model';

@Component({
  selector: 'app-ask-delete',
  templateUrl: './ask-delete.component.html',
  styleUrls: ['./ask-delete.component.css']
})
export class AskDeleteComponent implements OnInit {

  article!: Article;

  constructor(public dialogRef: MatDialogRef<AskDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Article) {
    this.article = data;
  }

  ngOnInit(): void {
  }

  confirm(ask: boolean) {
    this.dialogRef.close(this.article);
  }

}
