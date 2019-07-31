import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController, Alert } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { SubmitModel } from '../perhitungan-suara/submit.model';
import { UserProvider } from '../../providers/user/user';
import { SubmitProvider } from '../../providers/submit/submit';
import { AlertController } from 'ionic-angular';
import { tpsResp, daerah } from '../login/login.model';

/**
 * Generated class for the PerhitunganSuaraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perhitungan-suara',
  templateUrl: 'perhitungan-suara.html',
})
export class PerhitunganSuaraPage {
  public items: tpsResp[] =[];
  public city: any;
  imageURI:File;
  imageFileName:any;
  public photos : any;
  public images: any;
  public base64Image : string;
  
  public extension: string = '.jpg';
  public name: string = '';
  public kota: string = '';
  public kecamatan: string = '';
  public kelurahan: string = '';
  public tps: string = '';
  public model = new SubmitModel();
  public noTps: string = '';
  public region: string = '';
  
 
  daerah = [
    {
      kota: 'Kabupaten Brebes',
    },
    {
      kota: 'Kabupaten Tegal',
    },
    {
      kota: 'Kota Tegal',
    }
  ]

  constructor( private submitProvider: SubmitProvider, 
    private userProvider: UserProvider, 
    private storage: Storage, 
    public navCtrl: NavController, 
    public navParams: NavParams,  
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController, private alertCtrl: AlertController) {
    this.setData()
      
  }
  
  ngOnInit() {
    this.photos = [];
  }
  
  setData(){
    this.storage.get('name').then((name) => {
      this.name = name
    })
    this.storage.get('region_id').then((region) => {
    this.region = region
})
// this.storage.get('tps').then((result) => {
//   for(var i=0;i<result.length;i++) {
//     const modal: tpsResp = {
//       tps_id: result[i]['tps_id'],
//       no_tps: result[i]['no_tps']
//     }

//     this.items.push(modal);
//     //this.items = result[i]['no_tps'];
//   }

//   //   console.log("tps = "+result['tps'][i])
//   } 
  }


chooseFoto(){
  let alert = this.alertCtrl.create();
    alert.setTitle('Silahkan Pilih Media Foto!');

    alert.addInput({
      type: 'radio',
      label: 'GALERI',
      name: 'input-galeri',
      id: 'input-galeri',
      value: 'GALERI',
      //checked: true
    });

   alert.addInput({
      type: 'radio',
      label: 'CAMERA',
      name: 'input-camera',
      id: 'input-camera',
      value: 'CAMERA'
    });
   
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        if(data == 'GALERI'){
          this.selectPhoto(2)
          
        }else {
          this.upload(1)
        }
       
      
        //console.log('Checkbox data:', data);
      }
    });
    alert.present();
  
}

  selectPhoto(sourceType:number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();

        
      this.imageURI = imageData;
      this.imageFileName = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      //console.log(err);
      //this.presentToast(err);
    });
  } 
  upload(sourceType:number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      cameraDirection : this.camera.Direction.BACK,
      sourceType:sourceType,
    }
    
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();
        
      
     
      this.imageURI = imageData;
      this.imageFileName = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      //console.log(err);
      // this.presentToast(err);
    });
  }

  // onChange(value){
  //   console.log("masukkkkkkkkkk "+value);
  //   this.noTps = value
  // }
  onKota(value){
    //console.log("kotaaaa  "+value);
    this.kota = value
  }
  
  deletePhoto() {
    let confirm = this.alertCtrl.create({
        title: 'Apakah kamu yakin ingin menghapus foto?',
        message: '',
        buttons: [
          {
            text: 'Tidak',
            handler: () => {
              //console.log('Disagree clicked');
            }
          }, {
            text: 'Hapus',
            handler: () => {
              //console.log('Agree clicked');
              this.imageFileName = null;
              this.imageURI = null;
            }
          }
        ]
      });
    confirm.present();
  }
  submit() {
    let alert = this.alertCtrl.create({
      title: 'SUBMIT SUARA',
      message: 'Pastikan data yang anda input sudah benar?',
      buttons: [
        {
          text: 'TIDAK',
          role: 'cancel',
          handler: () => {
           // console.log('Cancel clicked');
          }
        },
        {
          text: 'YA',
          handler: () => {
            this.uploadDocument()
          }
        }
      ]
    });
    alert.present();
  }
  uploadDocument(){
   
    if(this.model.total_votes_teguh == '' || this.model.total_votes_pan == '' || this.kota == '' ||
     this.model.kecamatan == '' || this.model.kelurahan == '' ||  this.model.no_tps == '') {
      alert("Data Inputan tidak boleh kosong")
    }else if(Number(this.model.total_votes_teguh) > Number(this.model.total_votes_pan) ){
      alert("Data total suara TEGUH tidak boleh lebih besar dari total suara PAN!")
      this.model.total_votes_teguh = '';
      this.model.total_votes_pan = '';
    }else if(this.imageURI == null) {
      alert("Mohon ambil foto terlebih dahulu!")
    }else{
        
      
      this.storage.get('no_handphone').then((noHp) => { 
        //console.log("isi base"+this.imageURI)
            const uploadData = new FormData();
              uploadData.append('file', this.imageURI) 
              uploadData.append('total_votes_teguh',this.model.total_votes_teguh)
              uploadData.append('total_votes_pan',this.model.total_votes_pan)
              uploadData.append('fileName',noHp+this.extension)
              uploadData.append('tpsId',  this.noTps)
              uploadData.append('regionId',  this.region)
              uploadData.append('kota',  this.kota)
              uploadData.append('kecamatan',  this.model.kecamatan)
              uploadData.append('kelurahan',  this.model.kelurahan)
              uploadData.append('no_tps',  this.model.no_tps)
  
              
                this.submitProvider.uploadDocument(uploadData).subscribe( 
                  res => {
                    if(res != null){ 
                      let alert = this.alertCtrl.create({
                        title: 'UPLOAD',
                        message: 'BERHASIL',
                        buttons: [
                          {
                            text: 'OK',
                            role: 'cancel',
                            handler: () => {
                              //console.log('Cancel clicked');
                            }
                          },
                        ]
                      });
                      alert.present();
                    }
                    // alert(res['message'])
                    //this.submitProvider.logout()
                    
              },
              error => {
                if( error['error']['message'].includes('Duplicate')){
                  let alert = this.alertCtrl.create({
                    title: 'UPLOAD BERMASALAH',
                    message: 'DATA SUDAH PERNAH DIKIRIM',
                    buttons: [
                      {
                        text: 'OK',
                        role: 'cancel',
                        handler: () => {
                         
                        }
                      },
                    ]
                  });
                  alert.present();
                }else{
                  alert(error['error']['message'])
                }
              
              }
        )}
         )
         
        }
    }
  }

  
  
