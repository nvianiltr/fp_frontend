import { Component, OnInit } from '@angular/core';
import { Article } from '../models/Article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  
  constructor(private articleService: ArticleService) { }

  ngOnInit() {
  	this.getArticles();
  }

  getArticles(): void {
  	this.articleService.getArticles()
  		.subscribe(articles => { this.articles = articles });
  }

}
