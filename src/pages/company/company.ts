import { Component } from '@angular/core';
import { ViewController, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { Auth } from '../../providers/auth';
import { CITYDATA }  from '../../constant/city-data';

@Component({
  selector: 'page-company',
  templateUrl: 'company.html'
})
export class CompanyPage {

	params: any = {data:{}};
	iconType:boolean = true;

	cityData: any[]; //城市数据
  	cityName:string; //初始化城市名

  	constructor (public camera: Camera,
                 public viewCtrl: ViewController,
                 public actionSheetCtrl: ActionSheetController,
                 public storage: Storage,
                 public auth: Auth)
    {
		this.storage.get('user').then((user) => {
            this.params.data = user;
            this.cityName = user.enterpriseAddressProvince + ' ' 
            	+ user.enterpriseAddressCity + ' '
            	+ user.enterpriseAddressDistrict;
            console.log(this.cityName);
        });
        this.cityData = CITYDATA; // * 获取城市数据
    }

   //* 城市选择器被改变时触发的事件
  	cityChange(event){
    	console.log(event);
    	this.params.data.enterpriseAddressProvince = event.province.text; 
        this.params.data.enterpriseAddressCity = event.city.text;
        this.params.data.enterpriseAddressDistrict = event.region.text;
  	}

  	editCompany(){
  		this.iconType = !this.iconType;
  		if(this.iconType){
  			this.auth.authparamPut('/restapi/user/'+this.params.data.id+'/personal', this.params.data, true).then((result) => {
	            this.storage.set('user', this.params.data);
	            this.auth.showMessage("修改成功")
	        },(err) =>{
	           
	        });
  		}
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
	      // let base64Image = 'data:image/jpeg;base64,' + imageData;
	    }, (err) => {
	      console.log(err);
	    });

	    this.dismiss();
	}

  	ionViewDidLoad() {
   		console.log('ionViewDidLoad CompanyPage');
  	}

}
