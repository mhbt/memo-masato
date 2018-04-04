/**
 * @file - Archive Page Controller 
 * @description -Controls the functioning of archive page <archive.html> which is styled by <archive.scss>
 * @requires StorageProvider - The provider that manages memory and storage of memos.
 * @borrows MEMO object. Which is an object interface/class of Memo.
 */
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MemoPage } from '../memo/memo';
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
/**
 * @class ArchivePage logical class - contains application 
 * @member - archive @type <Array:MEMO> array that holds archive memos.
 * @function ionViewDidLoad - @description LifeCycle event - loads archive from storage
 * @function navToMemoPage - @description  Navigate to memo page (shows memo )- shows complete memo
 * @function removeMemo - @description  Completely removes the memo from application memory completely
 */
export class ArchivePage {
  /**
   * @prop archieve @type Array<Memo>
   * @description  list of memo objects which populate the page template UI
   * @borrows Memo
   */
  archive: Array<Memo>;
   /**
   * 
   * @param navCtrl Controls the navigations inside app
   * @param navParams Contains navigation data while navigating between pages
   * @param storage  is a storage provider that fetch data<memos> in memory
   */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public strorage: StorageProvider
  ) {
  }
  /**
   * @function  ionViewDidLoad - life cycle hook 
   * @description  Loads archive content from storage to memory.
   * @returns void
   */
  ionViewDidLoad() {
    this.archive = this.strorage.getArchieve();
    console.log(this.archive);
  }
  /**
   * @function  navToMemoPage - Navigate to memo page with given memo id
   * @param id - ID of memo to be viewed 
   * @description  Loads archive content from storage to memory
   * @returns void
   */
  navToMemoPage(id) {
    this.navCtrl.push(MemoPage, { memoId: id, archive: true });
  }
  /**
   * @function  removeMemo 
   * @param id - Id of memo to be removed completely
   * @description  Completely removes a memo from application
   * @returns void
   */
  removeMemo(id) {
    this.strorage.removeArchieveMemo(id);
  }

}
