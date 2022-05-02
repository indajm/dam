import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicionPage } from './medicion.page';

describe('MedicionPage', () => {
  let component: MedicionPage;
  let fixture: ComponentFixture<MedicionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
