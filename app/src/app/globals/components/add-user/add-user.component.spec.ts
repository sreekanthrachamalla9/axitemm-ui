import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AddUserComponent } from './add-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = {
      addUser: jest.fn()
    };

    routerMock = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [AddUserComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values and invalid state', () => {
    const form = component.userForm;
    expect(form).toBeDefined();
    expect(form.invalid).toBe(true);
    expect(form.value).toEqual({
      email: '',
      username: '',
      password: ''
    });
  });

  it('should mark form as valid when filled correctly', () => {
    component.userForm.setValue({
      email: 'test@example.com',
      username: 'Sree',
      password: 'pass123'
    });

    expect(component.userForm.valid).toBe(true);
  });

  it('should disable the submit button if form is invalid', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTruthy();
  });

  it('should call addUser and navigate on successful form submission', fakeAsync(() => {
    const mockFormData = {
      email: 'sree@example.com',
      username: 'Sree',
      password: 'password123'
    };

    authServiceMock.addUser.mockReturnValue(of({ success: true }));
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    component.userForm.setValue(mockFormData);
    component.onSubmit();
    tick(); // simulate async

    expect(authServiceMock.addUser).toHaveBeenCalledWith(mockFormData);
    expect(alertSpy).toHaveBeenCalledWith('User added successfully');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/users']);
  }));

  it('should show alert on error during submission', fakeAsync(() => {
    const mockFormData = {
      email: 'fail@test.com',
      username: 'Fail',
      password: '123'
    };

    authServiceMock.addUser.mockReturnValue(throwError(() => new Error('Server error')));
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    component.userForm.setValue(mockFormData);
    component.onSubmit();
    tick(); // simulate async

    expect(authServiceMock.addUser).toHaveBeenCalledWith(mockFormData);
    expect(alertSpy).toHaveBeenCalledWith('Failed to add user');
    // expect(consoleSpy).toHaveBeenCalledWith('Error adding user:', expect.any(Error));
  }));
});
