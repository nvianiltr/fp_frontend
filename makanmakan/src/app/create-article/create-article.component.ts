import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import { Article } from '../models/Article';
import { ArticleService } from '../article.service';


@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

	@Input() article: Article;
  res: any = {};

  constructor(
    private route:ActivatedRoute,
    private articleService: ArticleService,
    private location: Location) { }

  // add(title:string, content:string){
  // 	this.articleService.addArticle(article)
  // 	.subscribe(article => this.articles ;
  // }

  add() {
    this.articleService.addArticle(this.article).subscribe(
       res => {
         this.res = res;
       });
  }

//    console.log(this.article);

  ngOnInit() {
    this.article = new Article;
  }

}
