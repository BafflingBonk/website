import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellEditorComponent } from './spell-editor.component';

describe('SpellEditor', () => {
  let component: SpellEditorComponent;
  let fixture: ComponentFixture<SpellEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpellEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpellEditorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
