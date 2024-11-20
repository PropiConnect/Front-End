import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePropertiesComponent } from './update-properties.component';

describe('UpdatePropertiesComponent', () => {
  let component: UpdatePropertiesComponent;
  let fixture: ComponentFixture<UpdatePropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePropertiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
