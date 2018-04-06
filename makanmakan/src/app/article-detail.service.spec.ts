import { TestBed, inject } from '@angular/core/testing';

import { ArticleDetailService } from './article-detail.service';

describe('ArticleDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleDetailService]
    });
  });

  it('should be created', inject([ArticleDetailService], (service: ArticleDetailService) => {
    expect(service).toBeTruthy();
  }));
});
