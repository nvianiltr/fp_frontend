import { Component, OnInit } from '@angular/core';
import { Article } from '../models/Article';
import { ArticleService } from '../article.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import {User} from '../models/User';
import {UserService} from '../user.service';

@Component({
  selector: 'app-personal-article',
  templateUrl: './personal-article.component.html',
  styleUrls: ['./personal-article.component.css']
})
export class PersonalArticleComponent implements OnInit {


  articles: Article[];
  isArticleAvailable: boolean = true;
  user: User;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private articleService: ArticleService,
    private location: Location,
    private userService: UserService) { }

  public ngOnInit()
  {
    this.user = this.userService.getUser();
    this.getPersonalArticles();
  }

  getPersonalArticles(): void {
    this.articleService.getPersonalArticle(this.user.id).
    subscribe(articles => {
      if(articles.length!=0) {
        this.articles = articles;
        console.log(this.articles);
        this.isArticleAvailable = true;
      }
      else {
        this.isArticleAvailable = false;
      }});
  }

  deleteArticle(id: any){
    this.articleService.deletePersonalArticle(id).subscribe(article => {location.reload()});
  }
}
