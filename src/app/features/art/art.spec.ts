import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Art } from './art';

describe('Art', () => {
  let component: Art;
  let fixture: ComponentFixture<Art>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Art],
    }).compileComponents();

    fixture = TestBed.createComponent(Art);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
