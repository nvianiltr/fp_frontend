import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedRecipeComponent } from './saved-recipe.component';

describe('SavedRecipeComponent', () => {
  let component: SavedRecipeComponent;
  let fixture: ComponentFixture<SavedRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
