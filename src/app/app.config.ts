import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { apiKeyInterceptor } from './core/Interceptors/ApiKeyInterceptor'; // Adjust path as per your project structure

export const appConfig: ApplicationConfig = {
  providers: [
    // Provide HTTP client with the function-based interceptor
    provideHttpClient(withInterceptors([apiKeyInterceptor])),

    // Animations provider
    provideAnimations(),

    // Toastr provider
    provideToastr(),

    // Global error listeners
    provideBrowserGlobalErrorListeners(),

    // Zone change detection with event coalescing
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Router provider
    provideRouter(routes)
  ]
};