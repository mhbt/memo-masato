/**
 * @file Memo Page Controller
 * @requires StorageProvider
 * @borrows Memo Object
 */
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider, Memo} from '../../providers/storage/storage';

/**
 * Generated class for the MemoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage() //Ionic Page Decorator
@Component({ //Component Decorator
  selector: 'page-memo',
  templateUrl: 'memo.html',
})
/**
 * @class MemoPage 
 * @description handles display of memo data
 */
export class MemoPage {
  /**
   * @prop memo <Memo> - holds Memo object
   */
  memo:Memo;
  /**
   * @prop archiveFlag - sets when a memo comes from  archive page set.
   */
  archiveFlag:Boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:StorageProvider) {
    let memoId = this.navParams.get("memoId"); //gets the memo from navparams
    this.archiveFlag = this.navParams.get("archive"); // gets the memo archive flag
    if(this.archiveFlag == true){ 
      // if memo is from archive fetch it from archive
      this.memo = this.storage.getArchieveMemo(memoId);
      console.log(this.memo);
    }else{
      // if not then fetch is from memo 
      this.memo = this.storage.getMemo(memoId);
      console.log(this.memo);
    }
  }
  /**
   * @function toggleFavorite - flag/or deflag memo as favorite
   * @param id  specifies which memo - identifies memo by its id
   */
  toggleFavorite(id){
    this.storage.toggleFavoriteById(id);
  }
   /**
   * @function archiveMemo- archive current memo
   * @param id  specifies which memo - identifies memo by its id
   * @description goes back to the page from where it came after archiving memo
   */
  archiveMemo(id){
    this.storage.memoToArchiveById(id);
    this.navCtrl.pop();
  }
}
