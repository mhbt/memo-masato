/**
 * @file - Home Page Controller 
 * @description -Controls the functioning of Home page/template <home.html> which is styled by <home.scss>
 * @requires StorageProvider - The provider that manages memory and storage of memos.
 * @requires MemoPage - - shows single given memo
 * @requires FavPage - shows set/list of fav memos
 * @requires ArchivePage - shows set/list of archive memos
 * @requires NavController - controller for app navigartion
 * @requires AlerController - controller for displaying alerts
 * @requires toastController - controller for displaying feedback toasts.
 * @borrows MEMO object. Which is an object interface/class of Memo.
 */
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
  /**
   * @prop Memo <string> : Displays page name
   * @prop memos Array<Memo> : holds list of memos
   */
  appName: string = "Memo";
  memos:Array<Memo>;
  constructor(
    public navCtrl: NavController,
    public storage: StorageProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ){} 
  /** 
   * @function ionViewWillEnter - LifeCycleHook, fires before page enters into view
   * @description load memos from storage to app memory
   * 
  */
  ionViewWillEnter(){
    this.storage.loadMemos(); //load memos to memory
    this.memos = this.storage.getMemos(); //fetch the loaded memos to page
  }
   /** 
   * @function ionViewDidLoad - LifeCycleHook, fires after page enters into view
   * @description load memos from storage to app memory if not before
   * 
  */
  ionViewDidLoad(){
    this.storage.loadMemos(); //load memos to  memory
    this.storage.loadArchieve(); //load archive memos to memory
    this.memos = this.storage.getMemos(); // fetch memos from memory to page
  }
  /** 
   * @function addMemo adds memo to the application memory
   * @description inputs memo data from user through alert,sends feedback through toasts and adds memo to the app memory and store it.
   * @description updates the current memos
  */
  addMemo(){
    //Creates a controller from alterController
    let ctrl = this.alertCtrl.create({
      title:"New Memo", //Specifies title
      message:"Write a new memo", //Specifies message
      inputs:[ //Specifies inputs
        {
          name:"memo",
          placeholder: "New Memo",
          type: 'textarea'
        }

      ],
      buttons:[ //specifies buttons
        {
          text:"Cancel",
          handler:data =>{ 
            //Does Nothing
          }
        },
        {
          text:"Add",
          /**
           * @callback handler - handles the input memo data
           * @description - Adds to storage, update current view
           */
          handler:data =>{ //button handler
            if(data){
              this.storage.addMemo({memo: data.memo, favorite: false});
              this.memos = this.storage.getMemos();
              /**
               * @callback anonymous creates and present(chained) a toast(feedback) with specified options
               */
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
    ctrl.present(); //presents the alert
  }
  /**
   * @function markFavorite - flag specified memo as favorite
   * @param id specifies the id of memo
   * @description marks favorite, updates storage, update current view of memos.
   */
  markFavorite(id){
    this.storage.toggleFavorite(id);
    this.memos = this.storage.getMemos();
  }
  /**
   * @function removeMemo - Archive specified memo
   * @param id Specifies the id of memo 
   * @description archive memo, update storage and current view 
   */
  removeMemo(id){
    this.storage.memoToArchive(id);
    this.memos = this.storage.getMemos();
  }
  /**
   * @function navToMemoPage - navigates to memo page with specified memo
   * @param id - specifies memo by id
   */
  navToMemoPage(id){
    this.navCtrl.push(MemoPage,{memoId: id, archive: false});
  }
  /**
   * @function navToFavPage - navigates to fav page 
   */
  navToFavPage(){
    this.navCtrl.push(FavPage);
  }
   /**
   * @function navToArchivePage - navigates to archive page 
   */
  navToArchievePage(){
    this.navCtrl.push(ArchivePage);
  }
}
