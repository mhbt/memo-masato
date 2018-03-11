import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MemoPage} from '../memo/memo';
import { ArchivePage} from '../archive/archive';
import { StorageProvider, Memo } from '../../providers/storage/storage';
/**
 * Generated class for the FavPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fav',
  templateUrl: 'fav.html',
})
export class FavPage {
  favs:Array<Memo>= [];
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public storage:StorageProvider) {
  }
  ionViewCanEnter(){
    this.favs= this.storage.getFavs();
  }
  ionViewDidLoad() {
   this.favs =  this.storage.getFavs();
  }
  markFavorite(id){
    this.storage.toggleFavorite(id);
    this.favs = this.storage.getFavs();
  }
  removeMemo(id){
    this.storage.memoToArchive(id);
    this.favs = this.storage.getFavs();
  }
  navToMemoPage(id){
    this.navCtrl.push(MemoPage,{memoId: id, archive: false});
  }
  navToArchievePage(){
    this.navCtrl.push(ArchivePage);
  }

}
