import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Article } from '../models/Article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})

export class ArticleDetailComponent implements OnInit {

  article: Article;

  constructor(
    private route:ActivatedRoute,
    private articleService: ArticleService,
  ) { }

  ngOnInit():void {
    this.getArticle();
  }

  getArticle():void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.articleService.getArticleByID(id).subscribe(article => {this.article = article;
    });
  }
}
