import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherVideo } from '@ng-icons/feather-icons'
import { MediaDevicesService } from '../../services/media-devices.service';
import { videoDeviceInterface } from '../../interfaces/videoDevice.interface';
import { isEmptyValue } from '../../global/functions';
import { ApiService } from '../../services/api.service';

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

  constructor(
    private mediaDevicesService: MediaDevicesService,
    private apiService: ApiService
  ) {}

  isDisabledButton: boolean = false;
  availableDevices: videoDeviceInterface[] = [];
  connectedDevices: videoDeviceInterface[] = [];

  selectedFile: string | ArrayBuffer | null = null;
  result: string = '';


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

  onFileSelected(event: any): void {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedFile = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  onUpload(event: any){
    const formData = new FormData();
    if(!this.selectedFile)return;
    formData.append('image', this.selectedFile.toString())
    this.apiService.uploadImage(formData).subscribe(data=>{
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    if(isEmptyValue(this.connectedDevices)) return;
    this.connectedDevices.forEach((_, index)=>{
      console.log(index);
      this.disconnectDevice(index);
    })
    if(isEmptyValue(this.connectedDevices)) return;
    this.connectedDevices.forEach((_, index)=>{
      console.log(index);
      this.disconnectDevice(index);
    })
  }
}
