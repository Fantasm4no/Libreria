import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarLibrosComponent } from './eliminar-libros.component';

describe('EliminarLibrosComponent', () => {
  let component: EliminarLibrosComponent;
  let fixture: ComponentFixture<EliminarLibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarLibrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
