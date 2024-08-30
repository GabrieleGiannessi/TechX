import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedArticlePageComponent } from './saved-article-page.component';

describe('SavedArticlePageComponent', () => {
  let component: SavedArticlePageComponent;
  let fixture: ComponentFixture<SavedArticlePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedArticlePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavedArticlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
