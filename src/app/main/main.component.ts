import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '../global/table/table.component';
import { Article } from '../model/article.model';
import { ArticleService } from '../service/article.service';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild(TableComponent)
  tableComponent!: TableComponent;

  articles: Article[] = [];
  constructor(private readonly articleService: ArticleService, private router: Router, private readonly sessionService: SessionService) {
    this.getArticles();
  }

  ngOnInit(): void {
  }

  getArticles() {
    return this.articleService
                .getAll()
                .subscribe(articles => {
                  this.articles = articles;
                  this.tableComponent.connect(this.articles);
                });
  }

  goToAdmin() {
    this.sessionService.setSession();
    this.router.navigate(['/admin'])
  }

}
