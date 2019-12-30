import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardPostFormComponent } from './board-post-form.component';

describe('BoardAddPostComponent', () => {
  let component: BoardPostFormComponent;
  let fixture: ComponentFixture<BoardPostFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardPostFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardPostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
