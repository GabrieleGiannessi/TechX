import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyUserPageComponent } from './modify-user-page.component';

describe('ModifyUserPageComponent', () => {
  let component: ModifyUserPageComponent;
  let fixture: ComponentFixture<ModifyUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyUserPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
