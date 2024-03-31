import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupItemsComponent } from './group-items.component';

describe('GroupItemsComponent', () => {
  let component: GroupItemsComponent;
  let fixture: ComponentFixture<GroupItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupItemsComponent]
    });
    fixture = TestBed.createComponent(GroupItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
