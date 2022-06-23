import { AfterViewInit, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Article } from 'src/app/model/article.model';
import { TableDataSource } from './table-datasource';
import { AddEditArticleComponent } from './../add-edit-article/add-edit-article.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AskDeleteComponent } from './../ask-delete/ask-delete.component';
import { SessionService } from './../../service/session.service';
import { AbstractModalComponent } from '../abstract-modal/abstract-modal.component';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnDestroy {

  @Input() admin: boolean = false;

  displayedColumns: string[] = ['id', 'type'];
  displayedColumnsAdmin: string[] = ['id', 'type', 'actions'];
  dataSource!: MatTableDataSource<Article>;
  articles: Article[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,
              private readonly sessionService: SessionService,
              private readonly articleService: ArticleService,
              private _snackBar: MatSnackBar) {
  }

  ngOnDestroy(): void {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  connect(items: Article[]) {
    this.articles = items;
    this.dataSource = new MatTableDataSource(this.articles);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAbstractModal(article: Article) {
    this.articleService.getAbstractArticle(article.id, article.type).subscribe(r => {
      this.dialog.open(AbstractModalComponent, {data: {article, abstract: r}, });
    }, error => {
      this._snackBar.open('Article not found or External Error', 'OK', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: 'notify-error'
      });
    })

  }

  openModal(article?: Article) {
    const temp = new Article();
    if (article != null && article.id != null && article.type != null) {
      temp.id = article?.id;
      temp.type = article?.type;
    }
    const dialogRef = this.dialog.open(AddEditArticleComponent, {data: article != undefined ? temp : article});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.type === 2) {
          this.articleService.update(result.article).subscribe(r => {
            if (article) {
              const tempArt = r as Article;
              this.articles.filter(e => e.id === tempArt.id)[0].type = tempArt.type;
              this.updateTable();
            }
            this.createOrUpdate(result.article);
          }, e => {
            this.createOrUpdateFail(result.article);
          })
        } else if (result.type === 1) {
          this.articleService.add(result.article).subscribe(r => {
            this.createOrUpdate(result.article);
            this.articles.unshift(r as Article);
            this.updateTable();
          }, e => {
            this.createOrUpdateFail(result.article);
          })
        }
      }
    });
  }

  openDeleteModal(article: Article) {
    const dialogRef = this.dialog.open(AskDeleteComponent, {data: article});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.articleService.remove(result.id).subscribe(r => {
          this.deleteArticle(result);
          this.articles = this.articles.filter(e => e.id !== article.id);
          this.updateTable();
        }, e => {
          this.deleteArticleFail(result);
        })
      }
    });
  }

  createOrUpdate(article: Article) {
    this._snackBar.open('Article save', 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  createOrUpdateFail(article: Article) {
    this._snackBar.open('Article Save Failed', 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  deleteArticle(article: Article) {
    this._snackBar.open('Article deleted', 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  deleteArticleFail(article: Article) {
    this._snackBar.open('Article delete failed', 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  isLogged(): boolean {
    const toReturn = this.admin && this.sessionService.isLogged();
    return toReturn;
  }

  updateTable(): void {
    this.dataSource.data = this.articles;
  }

}
