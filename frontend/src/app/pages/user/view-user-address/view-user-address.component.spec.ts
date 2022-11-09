import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserAddressComponent } from './view-user-address.component';

describe('ViewUserAddressComponent', () => {
  let component: ViewUserAddressComponent;
  let fixture: ComponentFixture<ViewUserAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUserAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
