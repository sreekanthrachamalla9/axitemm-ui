import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [SignupComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.signupForm.value).toEqual({
      username: '',
      email: '',
      password: '',
    });
  });

  it('should mark form as invalid with empty fields', () => {
    expect(component.signupForm.invalid).toBeTrue();
  });

  it('should validate form fields', () => {
    const form = component.signupForm;

    form.controls['username'].setValue('ab'); // Too short
    form.controls['email'].setValue('invalid-email');
    form.controls['password'].setValue('123'); // Too short

    expect(form.invalid).toBeTrue();

    form.controls['username'].setValue('validName');
    form.controls['email'].setValue('test@example.com');
    form.controls['password'].setValue('validPass');

    expect(form.valid).toBeTrue();
  });

  it('should send POST request and navigate on success', fakeAsync(() => {
    const form = component.signupForm;
    form.setValue({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();

    const req = httpMock.expectOne('http://localhost:8080/api/signup');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(form.value);

    req.flush({ message: 'Signup successful' });

    tick();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  }));

  it('should handle error response', fakeAsync(() => {
    spyOn(window, 'alert');

    const form = component.signupForm;
    form.setValue({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();

    const req = httpMock.expectOne('http://localhost:8080/api/signup');
    req.flush('Signup failed', { status: 400, statusText: 'Bad Request' });

    tick();
    expect(window.alert).toHaveBeenCalledWith('Signup failed!');
  }));

  it('should mark all fields as touched if form is invalid', () => {
    spyOn(component.signupForm, 'markAllAsTouched');
    component.onSubmit();
    expect(component.signupForm.markAllAsTouched).toHaveBeenCalled();
  });
});
