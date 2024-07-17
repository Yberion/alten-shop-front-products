import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    MessageModule,
    ToastModule,
  ],
  exports: [
    MessageModule,
    ToastModule,
  ],
  providers: [MessageService],
})
export class PrimeNGModule {}
