import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-spell-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './spell-editor.component.html',
  styleUrls: ['./spell-editor.component.scss'],
})
export class SpellEditorComponent {

  public levels = [0,1,2,3,4,5,6,7,8,9];

  public schoolOptions = [
    { value: 'abjuration', label: 'Abjuration' },
    { value: 'conjuration', label: 'Conjuration' },
    { value: 'divination', label: 'Divination' },
    { value: 'enchantment', label: 'Enchantment' },
    { value: 'evocation', label: 'Evocation' },
    { value: 'illusion', label: 'Illusion' },
    { value: 'necromancy', label: 'Necromancy' },
    { value: 'transmutation', label: 'Transmutation' },
  ];

  public spell = new FormGroup({
    name: new FormControl<string>(''),
    description: new FormControl<string>(''),
    level: new FormControl<number>(0),
    school: new FormControl<string>(''),
  });

  public setLevel(level: number) {
    this.spell.controls.level.setValue(level);
  }

  public submit() {
    console.log(this.spell.value);
  }
}