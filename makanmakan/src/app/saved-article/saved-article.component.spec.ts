import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedArticleComponent } from './saved-article.component';

describe('SavedArticleComponent', () => {
  let component: SavedArticleComponent;
  let fixture: ComponentFixture<SavedArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
