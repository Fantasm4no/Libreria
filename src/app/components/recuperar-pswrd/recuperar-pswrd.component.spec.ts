import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarPswrdComponent } from './recuperar-pswrd.component';

describe('RecuperarPswrdComponent', () => {
  let component: RecuperarPswrdComponent;
  let fixture: ComponentFixture<RecuperarPswrdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperarPswrdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecuperarPswrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
