import { TestBed, inject } from '@angular/core/testing';

import { RecipeCollectionService } from './recipe-collection.service';

describe('RecipeCollectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeCollectionService]
    });
  });

  it('should be created', inject([RecipeCollectionService], (service: RecipeCollectionService) => {
    expect(service).toBeTruthy();
  }));
});
