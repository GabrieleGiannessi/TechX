import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatInputAreaComponent } from './chat-input-area.component';

describe('ChatInputAreaComponent', () => {
  let component: ChatInputAreaComponent;
  let fixture: ComponentFixture<ChatInputAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatInputAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatInputAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
