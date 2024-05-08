import { TestBed } from '@angular/core/testing';

import { DbRecipeService } from './db-recipe.service';

describe('DbRecipeService', () => {
  let service: DbRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
