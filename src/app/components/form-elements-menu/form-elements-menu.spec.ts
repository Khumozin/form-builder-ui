import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormElementsMenu } from './form-elements-menu';

describe('FormElementsMenu', () => {
  let component: FormElementsMenu;
  let fixture: ComponentFixture<FormElementsMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormElementsMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormElementsMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
