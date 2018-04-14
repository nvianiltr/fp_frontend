import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe, Location} from '@angular/common';
import { Article } from '../models/Article';
import { ArticleService } from '../article.service';
import { User } from '../models/User';
import {UserService} from '../user.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

	@Input() article: Article;

  user: User;
  message: string;
  res: any = {};

  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private location: Location,
    private userService: UserService, private datepipe: DatePipe) { }


  ngOnInit() {
    this.article = new Article();
  }

  add() {
    this.user = this.userService.getUser();

    this.article.user_id = this.user.id;
    this.article.dateCreated = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    // BELOM BS UPLOAD IMAGE //
    this.article.imageURL = "hehe.jpg";

    this.articleService.addArticle(this.article).subscribe(res => {
      this.article = res;
      console.log(this.article);
      this.router.navigate(['/article/'+this.article.id]);
      location.reload();
    }, err => {
      this.res = err;

       console.log(this.res);
      this.message = this.res.error.error;
    });

  }
}
