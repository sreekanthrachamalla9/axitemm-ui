import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http'; // ✅ For HttpClient
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // ✅ Correct name


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // ✅ This is required
    provideRouter(routes) // If you're using routing
  ]
});
