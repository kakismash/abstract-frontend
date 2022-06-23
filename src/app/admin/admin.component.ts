import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '../global/table/table.component';
import { ArticleService } from '../service/article.service';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild(TableComponent)
  tableComponent!: TableComponent;

  constructor(private readonly articleService: ArticleService, private readonly sessionService: SessionService, private router: Router) { }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    return this.articleService
                .getAll()
                .subscribe(articles => {
                  this.tableComponent.connect(articles);
                });
  }

  goToLogout() {
    this.sessionService.clearSession();
    this.router.navigate(['/']);
  }

}
