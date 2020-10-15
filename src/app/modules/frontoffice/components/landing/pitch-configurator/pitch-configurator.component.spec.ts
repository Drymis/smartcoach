import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchConfiguratorComponent } from './pitch-configurator.component';

describe('PitchConfiguratorComponent', () => {
  let component: PitchConfiguratorComponent;
  let fixture: ComponentFixture<PitchConfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PitchConfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitchConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
