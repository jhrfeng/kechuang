import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
// import { CameraService } from '../../providers/camera-service';

@Component({
  selector: 'page-company',
  templateUrl: 'company.html'
})
export class CompanyPage {

	iconType:boolean = true;

  	constructor (public camera: Camera,
                 public viewCtrl: ViewController,
                 public actionSheetCtrl: ActionSheetController)
    {
	
    }

  	// 初始化相机参数
	options: CameraOptions = {
	    quality: 100,
	    destinationType: this.camera.DestinationType.DATA_URL,
	    encodingType: this.camera.EncodingType.JPEG,
	    mediaType: this.camera.MediaType.PICTURE
	}

	// 打开弹出框
	public openSheet(){
	    let actionSheet = this.actionSheetCtrl.create({
	        title: '上传照片(限制单张)',
	        buttons: [
	            {
	              text: '选择相册',
	              role: 'destructive',
	              handler: () => {
	                 this.getPicture(0);
	              }
	            },{
	                text: '选择照相',
	                handler: () => {
	                  this.getPicture(1);
	                }
	            },{
	                text: '取消',
	                role: 'cancel',
	                handler: () => {
	                  console.log('Cancel clicked');
	                }
	            }
	          ]
	      });
	    actionSheet.present();
	}

	  // 关闭谈出框
	public dismiss() {
	    this.viewCtrl.dismiss();
	}

	// 选择照片
	public getPicture(type) {//1拍照,0从图库选择
	    this.options.sourceType = type;
	    this.camera.getPicture(this.options).then((imageData) => {
	      console.log(imageData);
	      let base64Image = 'data:image/jpeg;base64,' + imageData;
	    }, (err) => {
	      console.log(err);
	    });

	    this.dismiss();
	}

  	ionViewDidLoad() {
   		console.log('ionViewDidLoad CompanyPage');
  	}

}
