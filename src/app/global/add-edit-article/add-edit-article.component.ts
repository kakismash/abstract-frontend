import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from './../../model/article.model';

@Component({
  selector: 'app-add-edit-article',
  templateUrl: './add-edit-article.component.html',
  styleUrls: ['./add-edit-article.component.css']
})
export class AddEditArticleComponent implements OnInit {

  formType:     number = 1;  // 1 for add, 2 for edit
  formArticle!: FormGroup;
  article!:     Article;

  constructor(public dialogRef: MatDialogRef<AddEditArticleComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Article) {
    if (data) {
      this.formType = 2;
      this.article = data;
    } else {
      this.article = new Article();
    }
  }

  ngOnInit(): void {
    this.formArticle = this.fb.group({
      id: [this.article.id],
      type: [this.article.type]
    })
  }

  get idControl() {
    return this.formArticle.get('id');
  }

  get typeControl() {
    return this.formArticle.get('type');
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit() {
    this.article.id = this.formType === 1 ? parseInt(this.idControl?.value) : this.article.id;
    this.article.type = this.typeControl?.value;
    this.dialogRef.close({article: this.article, type: this.formType});
  }
}
