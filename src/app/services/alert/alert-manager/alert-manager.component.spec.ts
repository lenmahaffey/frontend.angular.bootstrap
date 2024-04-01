import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertManagerComponent } from './alert-manager.component';

describe('AlertManagerComponent', () => {
  let component: AlertManagerComponent;
  let fixture: ComponentFixture<AlertManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers:[],
    }).compileComponents();
    fixture = TestBed.createComponent(AlertManagerComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
