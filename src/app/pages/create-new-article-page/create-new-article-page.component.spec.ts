import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewArticlePageComponent } from './create-new-article-page.component';

describe('CreateNewArticlePageComponent', () => {
  let component: CreateNewArticlePageComponent;
  let fixture: ComponentFixture<CreateNewArticlePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewArticlePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateNewArticlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
