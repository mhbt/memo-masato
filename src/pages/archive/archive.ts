import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MemoPage} from '../memo/memo';
import { StorageProvider, Memo } from '../../providers/storage/storage';
/**
 * Generated class for the ArchivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-archive',
  templateUrl: 'archive.html',
})
export class ArchivePage {
  archive:Array<Memo>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public strorage: StorageProvider
    ) {
  }
  ionViewDidLoad() {
   this.archive = this.strorage.getArchieve(); 
   console.log(this.archive);
  }
  navToMemoPage(id){
    this.navCtrl.push(MemoPage,{memoId: id, archive: true});
  }
  removeMemo(id){
    this.strorage.removeArchieveMemo(id);
  }

}
