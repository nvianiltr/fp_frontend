import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '../article.service';
import {UserService} from '../user.service';
import {User} from '../models/User';
import {Article} from '../models/Article';

@Component({
  selector: 'app-saved-article',
  templateUrl: './saved-article.component.html',
  styleUrls: ['./saved-article.component.css']
})
export class SavedArticleComponent implements OnInit {

  articles: Article[] = [];
  user: User;
  isArticleAvailable: boolean = true;
  selectedArticle: number = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private userService: UserService) {
  }

  public ngOnInit() {
    this.user = this.userService.getUser();
    this.getSavedArticles();
  }

  deleteArticle(){
    var _obj = {
      'user_id': this.user.id,
      'article_id': this.selectedArticle
    };
    this.articleService.removeSavedArticle(_obj).subscribe(()=>{location.reload()});
  }

  setSelectedArticle(id: any) {
    this.selectedArticle = id;
  }

  getSavedArticles(): void {
    this.articleService.getSavedArticles(this.user.id).subscribe(articles => {
      if (articles.length != 0) {
        this.articles = articles;
        this.isArticleAvailable = true;
      }
      else {
        this.isArticleAvailable = false;
      }
    });
  }
}
