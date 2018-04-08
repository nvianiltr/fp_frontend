import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Article } from '../models/Article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})

export class ArticleDetailComponent implements OnInit {
	
  


  public article: Article;
    // = {};

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService) { }

  ngOnInit(): void {
      this.getArticle();
  }

  getArticle(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.articleService.getArticle(id)
      .subscribe(article => {
          this.article = article;
          console.log(this.article.id);
        });
  }



}

