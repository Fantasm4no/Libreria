import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirLibrosComponent } from './anadir-libros.component';

describe('AnadirLibrosComponent', () => {
  let component: AnadirLibrosComponent;
  let fixture: ComponentFixture<AnadirLibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnadirLibrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnadirLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
