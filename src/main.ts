/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

if ('serviceWorker' in navigator) {
  window.addEventListener("load", () => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("service-worker.js");
      }
    });
}