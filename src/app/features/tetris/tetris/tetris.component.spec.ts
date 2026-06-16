import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TetrisComponent } from './tetris.component';

describe('TetrisComponent', () => {
  let component: TetrisComponent;
  let fixture: ComponentFixture<TetrisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TetrisComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TetrisComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
