import { Injectable } from '@angular/core';
import { videoDeviceInterface } from '../interfaces/videoDevice.interface';

@Injectable({
  providedIn: 'root'
})
export class MediaDevicesService {

  constructor() { }

  async listVideoDevices(): Promise<videoDeviceInterface[]> {
    return new Promise((result, rejected)=>{
      navigator.mediaDevices.enumerateDevices()
        .then(devices => {
          const videoDevices = devices
            .filter(device => device.kind === 'videoinput')
            .map(camera=>({id:camera.deviceId, name: camera.label}));
          result(videoDevices);
        })
        .catch(err => {
          rejected(err);
        });
    })
  }

  async findDevice(deviceId: string): Promise<MediaDeviceInfo | undefined> {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.find(device => device.kind === 'videoinput' && device.deviceId === deviceId);
  }
  async findDeviceByName(name: string): Promise<MediaDeviceInfo | undefined> {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.find(device => device.kind === 'videoinput' && device.label === name);
  }

  connectDevice(deviceId: string): Promise<MediaStream> {
    return new Promise(async (resolve, rejected)=>{
      if (!navigator.mediaDevices ||!navigator.mediaDevices.getUserMedia) {
        rejected("El navegador no soporta el acceso a la cámara.");
      }
  
      try {
        const selectedCameraDevice = await this.findDevice(deviceId);
        if(!selectedCameraDevice) {
          rejected(`Dispositivo de cámara con ID "${deviceId}" no encontrado.`);
        }
  
        const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: { exact:selectedCameraDevice!.deviceId },
          },
        });
        const videoTracks = stream.getVideoTracks();
        if (videoTracks.length > 0) {
          resolve(stream);
        } else {
          rejected("La cámara no está proporcionando un video activo.");
        }
      } catch (error) {
        rejected(error);
      }
    })
  } 
}
