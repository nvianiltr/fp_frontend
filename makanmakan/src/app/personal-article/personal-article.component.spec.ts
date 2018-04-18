import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalArticleComponent } from './personal-article.component';

describe('PersonalArticleComponent', () => {
  let component: PersonalArticleComponent;
  let fixture: ComponentFixture<PersonalArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
