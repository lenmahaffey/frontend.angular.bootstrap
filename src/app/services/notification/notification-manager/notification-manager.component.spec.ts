import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationManagerComponent } from './notification-manager.component';

describe('NotificationManagerComponent', () => {
  let component: NotificationManagerComponent;
  let fixture: ComponentFixture<NotificationManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers: []
    }).compileComponents();
    fixture = TestBed.createComponent(NotificationManagerComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
