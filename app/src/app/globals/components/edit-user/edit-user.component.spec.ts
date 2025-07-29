import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EditUserComponent } from './edit-user.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('EditUserComponent (Jest)', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;
  let authServiceMock: jest.Mocked<AuthService>;
  let routerMock: jest.Mocked<Router>;

  beforeEach(async () => {
    const routeStub = {
      snapshot: {
        paramMap: {
          get: (key: string) => '1',
        },
      },
    };

    authServiceMock = {
      getUserById: jest.fn(),
      getDashboard: jest.fn(),
      updateUser: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    routerMock = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [EditUserComponent, ReactiveFormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and fetch user data', fakeAsync(() => {
    const mockUser = { data: { username: 'Sree', email: 'sree@test.com' } };
    const mockDashboard = { data: [{ id: 1, password: 'pass123' }] };

    authServiceMock.getUserById.mockReturnValue(of(mockUser));
    authServiceMock.getDashboard.mockReturnValue(of(mockDashboard));

    fixture.detectChanges(); // triggers ngOnInit
    tick();

    expect(component.editForm.value).toEqual({
      username: 'Sree',
      email: 'sree@test.com',
      password: 'pass123',
    });

    expect(authServiceMock.getUserById).toHaveBeenCalledWith('1');
    expect(authServiceMock.getDashboard).toHaveBeenCalled();
  }));

  it('should submit updated user if form is valid', fakeAsync(() => {
    component.id = '1';
    component.editForm.setValue({
      username: 'Sree',
      email: 'sree@test.com',
      password: 'pass123',
    });

    authServiceMock.updateUser.mockReturnValue(of({}));

    component.onUpdateUser();
    tick();

    expect(authServiceMock.updateUser).toHaveBeenCalledWith('1', {
      username: 'Sree',
      email: 'sree@test.com',
      password: 'pass123',
    });
    expect(routerMock.navigate).toHaveBeenCalledWith(['/users']);
  }));

  it('should not submit if form is invalid', () => {
    component.editForm.setValue({
      username: '',
      email: '',
      password: '',
    });

    component.onUpdateUser();

    expect(authServiceMock.updateUser).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
