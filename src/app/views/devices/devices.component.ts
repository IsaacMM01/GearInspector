import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherVideo } from '@ng-icons/feather-icons'
import { MediaDevicesService } from '../../services/media-devices.service';
import { videoDeviceInterface } from '../../interfaces/videoDevice.interface';
import { isEmptyValue } from '../../global/functions';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders:[provideIcons({ featherVideo })],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css'
})
export class DevicesComponent {
  @ViewChildren('devices') videoElements!: QueryList<ElementRef>;

  constructor(private mediaDevicesService: MediaDevicesService) {}

  isDisabledButton: boolean = false;
  availableDevices: videoDeviceInterface[] = [];
  connectedDevices: videoDeviceInterface[] = [];


  async listVideoDevices() {
    const response = await this.mediaDevicesService.listVideoDevices();
    if(isEmptyValue(response)) return;
    this.availableDevices = response;
  }

  ngOnInit(){
    this.listVideoDevices()
  }

  async connectDevice(deviceId: string) {
    this.isDisabledButton = true;
    this.mediaDevicesService.connectDevice(deviceId)
      .then(stream=>{
        const videoTracks = stream.getVideoTracks()[0];
        this.connectedDevices.push({
          id: videoTracks.id,
          name: videoTracks.label,
          stream: stream
        });

        this.availableDevices = this.availableDevices
          .filter(device=>deviceId !== device.id);
        this.isDisabledButton = false;
      })
      .catch(error=>{
        console.error('Ocurrió un error: ', error);
        this.isDisabledButton = false;
      });
  }

  async disconnectDevice(index: number) {
    const device = this.connectedDevices[index];
    if(isEmptyValue(device)) return;
    if(isEmptyValue(device.stream)) return;
    device.stream!.getTracks().forEach(track=>track.stop());
    this.connectedDevices.splice(index, 1);
    const availableDevice = await this.mediaDevicesService.findDeviceByName(device.name);
    if(isEmptyValue(availableDevice)) return;
    this.availableDevices.push({
      id: availableDevice!.deviceId,
      name: availableDevice!.label,
    })
  }
}
