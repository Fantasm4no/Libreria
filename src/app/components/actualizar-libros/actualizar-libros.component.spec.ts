import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarLibrosComponent } from './actualizar-libros.component';

describe('ActualizarLibrosComponent', () => {
  let component: ActualizarLibrosComponent;
  let fixture: ComponentFixture<ActualizarLibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarLibrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
