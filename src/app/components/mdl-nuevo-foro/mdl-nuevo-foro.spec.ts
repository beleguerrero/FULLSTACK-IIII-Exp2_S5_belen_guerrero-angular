import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlNuevoForo } from './mdl-nuevo-foro';

describe('MdlNuevoForo', () => {
  let component: MdlNuevoForo;
  let fixture: ComponentFixture<MdlNuevoForo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdlNuevoForo],
    }).compileComponents();

    fixture = TestBed.createComponent(MdlNuevoForo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
