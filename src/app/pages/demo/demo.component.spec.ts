import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoComponent } from './demo.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PagesModule } from '../pages.module';

describe('DemoComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [],
      imports:[ SharedModule, PagesModule ],
      providers: []
    })
    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
