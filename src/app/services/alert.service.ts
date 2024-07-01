import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertContainer!: HTMLElement;

  constructor(
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
    this.createAlertContainer();
  }

  private createAlertContainer(): void {
    this.alertContainer = document.createElement('div');
    this.alertContainer.className = 'fixed top-0 right-0 m-4 flex flex-col gap-2 z-50';
    document.body.appendChild(this.alertContainer);
  }

  private showAlert(message: string, type: string): void {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} p-4 rounded shadow-lg text-white flex items-center`;
    alert.innerText = message;

    // Style based on type
    if (type === 'success') {
      alert.classList.add('bg-green-500');
    } else if (type === 'error') {
      alert.classList.add('bg-red-500');
    } else if (type === 'info') {
      alert.classList.add('bg-blue-500');
    } else if (type === 'warning') {
      alert.classList.add('bg-yellow-500');
    }

    this.alertContainer.appendChild(alert);

    setTimeout(() => {
      this.alertContainer.removeChild(alert);
    }, 3000);
  }

  showSuccess(message: string): void {
    this.showAlert(message, 'success');
  }

  showError(message: string): void {
    this.showAlert(message, 'error');
  }

  showInfo(message: string): void {
    this.showAlert(message, 'info');
  }

  showWarning(message: string): void {
    this.showAlert(message, 'warning');
  }
}