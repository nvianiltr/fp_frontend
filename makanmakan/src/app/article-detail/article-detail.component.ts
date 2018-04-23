import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Article} from '../models/Article';
import {ArticleService} from '../article.service';
import {UserService} from '../user.service';
import {User} from '../models/User';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})

export class ArticleDetailComponent implements OnInit {

  article: Article;
  isLoggedIn: boolean;
  user: User = new User();
  isArticleSaved: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.getArticle();
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true;
      this.user = this.userService.getUser();
      this.isSaved();
    }
    else {
      this.isLoggedIn = false;
    }
  }

  getArticle(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.articleService.getArticleByID(id).subscribe(article => {
      this.article = article;
    });
  }

  saveArticle() {
    var _obj = {
      'user_id': this.user.id,
      'article_id': this.article.id
    };
    this.articleService.saveArticle(_obj).subscribe(() => {
      this.isArticleSaved = true;
    });
  }

  isSaved() {
    var arr = new Array();
    this.articleService.getSavedArticles(this.user.id).subscribe(articles => {
      arr = articles;
    },() => {},
      () => {
        var result = arr.filter(x => x.id == this.article.id);
        if (result.length == 0) {
          this.isArticleSaved = false;
        }
        else {
          this.isArticleSaved = true;
        }
      });
  }

  unsaveArticle() {
    var _obj = {
      'user_id': this.user.id,
      'article_id': this.article.id
    };
    this.articleService.removeSavedArticle(_obj).subscribe(() => {
      this.isArticleSaved = false;
    });
  }
}
