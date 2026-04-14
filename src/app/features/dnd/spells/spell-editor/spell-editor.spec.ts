import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellEditor } from './spell-editor';

describe('SpellEditor', () => {
  let component: SpellEditor;
  let fixture: ComponentFixture<SpellEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpellEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(SpellEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
