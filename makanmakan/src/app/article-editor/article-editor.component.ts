import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe, Location} from '@angular/common';
import {Article} from '../models/Article';
import {ArticleService} from '../article.service';
import {User} from '../models/User';
import {UserService} from '../user.service';
import * as $ from 'jquery';
import {HttpClient} from '@angular/common/http';
import {FirebaseApp} from 'angularfire2';
import 'firebase/storage';


@Component({
  selector: 'app-article-editor',
  templateUrl: './artice-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})

export class ArticleEditorComponent implements OnInit {

  @Input() article: Article;
  user: User;
  message: string;
  res: any = {};
  selectedFile: File = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private articleService: ArticleService,
    private location: Location,
    private userService: UserService,
    private datepipe: DatePipe,
    private firebase: FirebaseApp
  ) {}


  ngOnInit() {
    this.user = this.userService.getUser();
    this.article = new Article();
    this.route.params.subscribe(params => {
      var id = +params['id'];
      if (params.id != null) {
        this.articleService.getArticleByID(id).subscribe(article => {
          this.article = article;
          if(this.article.imageURL != "default.jpg"){
            var tempurl = this.article.imageURL;
            tempurl = tempurl.substr(75, 40);
            $('p#filename').text(tempurl);
          }
          else {
            $('p#filename').text('No file chosen');
          }
        });
      }
    });
  }

  createUUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid + '.jpg';
  }

  onFileSelected() {
    $(document).ready(function () {
      $('p#filename').text($('#image')[0].files[0].name);
    });
  }

  uploadImage() {
    return new Promise((resolve)=>{
      var _url: string;
      var temp = this.createUUID();
      this.selectedFile = <File> $('#image')[0].files[0];
      const fd = new FormData();
      fd.append('image', this.selectedFile, temp);
      this.http.post('https://us-central1-makanmakan-e28a1.cloudfunctions.net/uploadFile', fd)
        .subscribe(res => {
            console.log(res);
          }, error => {
            console.log(error);
          },
          () => {
            var storage = this.firebase.storage();
            var storageRef = storage.ref();
            var spaceRef = storageRef.child(temp);
            spaceRef.getDownloadURL().then(function (url) {
              _url = url;
              resolve(_url);
            }).catch(function (error) {
              console.log(error);
            });
          });
    })
  }


  save() {
    /* CREATING NEW ARTICLE */
    if (this.article.id == null) {
      const p = new Promise((resolve, reject) => {
        if ($('#image')[0].files[0] == null || this.article.title == null || this.article.content == null) {
          resolve('default.jpg');
        }
        else {
          resolve(
            this.uploadImage().then((res)=>{resolve(res)})
          );
        }
      }).then((res) => {
        this.article.imageURL = res.toString();
        console.log(this.article.imageURL);
      }).then(() => {
        this.article.user_id = this.user.id;
        this.article.dateCreated = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
        this.articleService.addArticle(this.article).subscribe(res => {
          this.article = res;
          // console.log(this.article);
          this.router.navigate(['/article/'+this.article.id]);
        }, err => {
          this.res = err;
          // console.log(this.res);
          this.message = this.res.error.error;
          window.scrollTo(0,0);
        });
      });
    }

    /* UPDATING EXISTING ARTICLE */
    else {
      const p = new Promise((resolve,reject)=>{
        if ($('#image')[0].files[0] == null) {
          resolve(this.article.imageURL);
        }
        else {
          resolve(
            this.uploadImage().then((res)=>{resolve(res)})
          );
        }
      }).then((res)=>{
        this.article.imageURL = res.toString();
      }).then(()=>{
        this.articleService.updateArticle(this.article, this.article.id).subscribe(
          () => {
            this.router.navigate(['/article/'+this.article.id]);
          });
      })
    }
  }
}
