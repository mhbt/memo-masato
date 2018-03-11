import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider, Memo} from '../../providers/storage/storage';

/**
 * Generated class for the MemoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-memo',
  templateUrl: 'memo.html',
})
export class MemoPage {
  memo:Memo;
  archiveFlag:Boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:StorageProvider) {
    let memoId = this.navParams.get("memoId");
    this.archiveFlag = this.navParams.get("archive");
    if(this.archiveFlag == true){
      this.memo = this.storage.getArchieveMemo(memoId);
      console.log(this.memo);
    }else{
      this.memo = this.storage.getMemo(memoId);
      console.log(this.memo);
    }
  }

  ionViewDidLoad() {
    
  }
  toggleFavorite(id){
    this.storage.toggleFavoriteById(id);
  }
  archiveMemo(id){
    this.storage.memoToArchiveById(id);
    this.navCtrl.pop();
  }
}
