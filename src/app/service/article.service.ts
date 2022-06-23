import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../model/article.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  URL_PATH: string = process && process.env && process.env["URL_API"] ? process.env["URL_API"] : 'http://localhost:3000/';
  path: string = this.URL_PATH  + 'article';

  constructor(private readonly http: HttpClient, private readonly sessionService: SessionService) { }

  getAll() {
    return this.http.get<Article[]>(this.path);
  }

  remove(id: number) {
    if (this.sessionService.isLogged()) {
      console.log(id);
      return this.http.delete<Article>(this.path + '/' + id);
    } else {
      throw Error('No Logged');
    }
  }

  add(article: Article) {
    if (this.sessionService.isLogged()) {
      return this.http.post(this.path, article);
    } else {
      throw Error('No Logged');
    }
  }

  update(article: Article) {
    if (this.sessionService.isLogged()) {
      console.log(article);

      return this.http.put(this.path + '/' + article.id, article);
    } else {
      throw Error('No Logged');
    }
  }

  getAbstractArticle(id: number, type: string) {
    return this.http.get(this.path + '/' + id + '/' + type);
  }
}
