import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { StorageProvider, Memo} from '../../providers/storage/storage';

import { MemoPage } from "../memo/memo";
import { FavPage} from "../fav/fav";
import { ArchivePage } from "../archive/archive";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  appName: string = "Memo";
  memos:Array<Memo>;
  constructor(
    public navCtrl: NavController,
    public storage: StorageProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ){} 
  ionViewCanEnter(){}
  ionViewWillEnter(){
    this.storage.loadMemos();
    this.memos = this.storage.getMemos();
  }
  ionViewDidLoad(){
    this.storage.loadMemos();
    this.storage.loadArchieve();
    this.memos = this.storage.getMemos();
  }
  addMemo(){
    let ctrl = this.alertCtrl.create({
      title:"New Memo",
      message:"Write a new memo",
      inputs:[
        {
          name:"memo",
          placeholder: "New Memo",
          type: 'textarea'
        }

      ],
      buttons:[
        {
          text:"Cancel",
          handler:data =>{
            //Does Nothing
          }
        },
        {
          text:"Add",
          handler:data =>{
            if(data){
              this.storage.addMemo({memo: data.memo, favorite: false});
              this.memos = this.storage.getMemos();
              ctrl.onDidDismiss(()=>{
                this.toastCtrl.create({
                  message: "New Memo Added",
                  cssClass:"toast",
                  duration:2000
                }).present();
              });
            }
          }
        }
      ]
    });
    ctrl.present();
  }
  markFavorite(id){
    this.storage.toggleFavorite(id);
    this.memos = this.storage.getMemos();
  }
  removeMemo(id){
    this.storage.memoToArchive(id);
    this.memos = this.storage.getMemos();
  }
  navToMemoPage(id){
    this.navCtrl.push(MemoPage,{memoId: id, archive: false});
  }
  navToFavPage(){
    this.navCtrl.push(FavPage);
  }
  navToArchievePage(){
    this.navCtrl.push(ArchivePage);
  }
}
