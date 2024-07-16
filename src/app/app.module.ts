import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from 'app/app.component';
import { BaseModule } from 'app/base/base.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    BaseModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en' },
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule {}
