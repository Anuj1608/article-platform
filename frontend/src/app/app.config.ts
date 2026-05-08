import { ApplicationConfig } from "@angular/core";
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from "@angular/router";
import {
  provideHttpClient,
  withInterceptors,
  withFetch,
} from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { routes } from "@/app/app.routes";
import { authInterceptor } from "@/app/core/interceptors/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({ onSameUrlNavigation: "reload" }),
    ),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideAnimations(),
  ],
};
