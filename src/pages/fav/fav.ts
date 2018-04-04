/**
 * @file - Fav Page Controller 
 * @description -Controls the functioning of Fav page/template <fav.html> which is styled by <fav.scss>
 * @requires StorageProvider - The provider that manages memory and storage of memos.
 * @borrows MEMO object. Which is an object interface/class of Memo.
 */
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
/**
 * @class ArchivePage logical class - contains application 
 * @member  @type <Array:MEMO> array that holds archive memos.
 * @function ionViewCanEnter - @description Life Cycle hook - triggers and loads before loading page UI.
 * @function ionViewDidLoad - @description LifeCycle event - loads archive from storage
 * @function navToMemoPage - @description  Navigate to memo page (shows memo )- shows complete memo
 * @function navToArchivePage - @description Navigate to Archive page.
 * @function removeMemo - @description  archive the memo from application memory completely
 */
export class FavPage {
   /**
   * @prop archieve @type Array<Memo>
   * @description  list of memo objects which populate the page template UI
   * @borrows Memo
   */
  favs:Array<Memo>= [];

  /**
   * 
   * @param navCtrl Controls the navigations inside app
   * @param navParams Contains navigation data while navigating between pages
   * @param storage  is a storage provider that fetch data<memos> in memory
   */
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public storage:StorageProvider) {
  }
   /**
   * @function  ionViewCAnEnter - life cycle hook loads favorite memos, fires before page transition into view
   * @description  Loads fav memos from storage to memory.
   * @returns void
   */
  ionViewCanEnter(){
    this.favs= this.storage.getFavs();
  }
   /**
   * @function  ionViewDidLoad - life cycle hook - fires when page has completed transition
   * @description  Loads archive content from storage to memory if they aren't loaded yet.
   * @returns void
   */
  ionViewDidLoad() {
   this.favs =  this.storage.getFavs();
  }
  /**
   * @function markFavorite - flag a memo as favorite.
   * @param id - id of the memo to be marked
   * @returns void
   */
  markFavorite(id){
    this.storage.toggleFavorite(id);
    this.favs = this.storage.getFavs();
  }
  /**
   * @function removeMemo moves the specified memo to archive
   * @param id  id of the memo to be archived
   * @returns void
   */
  removeMemo(id){
    this.storage.memoToArchive(id);
    this.favs = this.storage.getFavs();
  }
  /**
   * @function navToMemoPage navigate to memo page
   * @param id specifies the id of the memo to be loaded in memo page
   * @returns void
   */
  navToMemoPage(id){
    this.navCtrl.push(MemoPage,{memoId: id, archive: false});
  }
  /**
   * @function navToArchievePage navigate to archive page
   * @param void
   * @return void
   */
  navToArchievePage(){
    this.navCtrl.push(ArchivePage); //ArchivePage is IONIC PAGE
  }

}
