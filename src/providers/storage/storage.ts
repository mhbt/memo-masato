/**
 * @file Application storage Provider
 * @description Handles all task from storing to memory to reterival and updates.
 * @description Key to the whole application, Whole application is written on top of this provider
 * 
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class StorageProvider {
  /**
   * @member memo Array<Memo> List of memos
   */
  memos:Array<Memo>=[];
   /**
   * @member memo Array<Memo> List of archive memos
   */
  memoArchieve:Array<Memo>=[];
  constructor(public http: HttpClient) {
    console.log('Hello StorageProvider Provider');
    // this.memos = [new Memo({})];
    // this.memoArchieve = [new Memo()];
    
  }
  /** 
   * @function getArchive
   * @returns Array<Memo> - List of Archive memos
  */
  getArchieve(){
    return this.memoArchieve;
  }
  /** 
   * @function loadMemos
   * @description load memos from strorage to memory and coverts it to javascript Object
  */
  loadMemos(){
    let memos = localStorage.getItem("memos");
    if(memos){
      this.memos = JSON.parse(memos);
    }
  }
  /** 
   * @function loadArchieve
   * @description load archive memos from strorage to memory and coverts it to javascript Object
  */
  loadArchieve(){
    let memoArchieve = localStorage.getItem("memoArchive");
    if(memoArchieve){
      this.memoArchieve = JSON.parse(memoArchieve);
    }
  }
  /** 
   * @function getMemos
   * @returns reterived memos 
  */

  getMemos(){
    return this.memos;
  }
  /**
   * @function addMemo adds new memo
   * @description adds memo, updates the storage
   * @param memo an object which has memo <string> and favorite<boolean> flag
   */
  addMemo(memo){
    //this.memos.length serves as memo id
    this.memos.unshift(new Memo(this.memos.length, memo.memo, memo.favorite)); //creates a memo object from details
    setTimeout(()=>{
      localStorage.setItem("memos", JSON.stringify(this.memos));
    },0);
  }
  /**
   * @function addArchieve archieve memo
   * @description archive memo, updates the storages i.e memos and archive storage.
   * @param memo an object which has memo <string> and favorite<boolean> flag
   */
  addArcheive(memo){
     //this.memos.length serves as memo id
    this.memoArchieve.unshift(new Memo(this.memos.length, memo.memo, memo.favorite)); //creates a memo object from details
    setTimeout(()=>{
      localStorage.setItem("memoArchive", JSON.stringify(this.memoArchieve));
    },0);
  }
  /**
   * @function getMemo
   * @param id specifes the memo to get
   * @returns returns the memo with id === id from memos
   */
  getMemo(id){
    return this.memos[+id];
  }
   /**
   * @function getArchieveMemo
   * @param id specifes the memo to get
   * @returns returns the memo with id === id from archive
   */
  getArchieveMemo(id){
   return this.memoArchieve[+id];
  }
  /**
   * @function toggleFavorite
   * @description toggles the favorite flag of a memo and updates storage
   * @param index index of the memo in the array, index is not id, sorting is index based
   */
  toggleFavorite(index){
    this.memos[index].favorite = !this.memos[index].favorite;
    setTimeout(()=>{
      localStorage.setItem("memos", JSON.stringify(this.memos));
    },0);
  }
   /**
   * @function toggleFavoriteById - similar to toggleFavorite
   * @description toggles the favorite flag of a memo  and updates storage
   * @param id id of the memo in the array
   */
  toggleFavoriteById(id){
   this.memos.filter((memo, i)=>{
        if( memo.id === +id){
          memo.favorite = !memo.favorite;
        }
    });
    setTimeout(()=>{
      localStorage.setItem("memos", JSON.stringify(this.memos));
    },0);
  }
  /**
   * @function memoToArchive
   * @description archives the given memo based on index
   * @param id specifies the memo id, here id === index
   */
  memoToArchive(id){
    let memo:Memo = this.memos[id];
    this.memos.splice(id,1);
    this.addArcheive(memo);
    setTimeout(()=>{
      localStorage.setItem("memos", JSON.stringify(this.memos));
    },0);
  }
   /**
   * @function memoToArchiveById --simiar to memoToArchive
   * @description archives the given memo based on its id
   * @param id specifies the memo id, here id === memo.id
   */
  memoToArchiveById(id){
    let memo =this.memos.filter((memo, i) => {
      return memo.id == id;
    });
    this.memos = this.memos.filter((memo)=>{
      return memo.id !== id;
    });
    if(memo){
      this.addArcheive(memo[0]);
      setTimeout(()=>{
        localStorage.setItem("memos", JSON.stringify(this.memos));
      },0);
    }
  }
  /**
   * @function removeArchieveMemo 
   * @description removes the memo from application i.e deletes from archive
   * @param id 
   */
  removeArchieveMemo(id){
    this.memoArchieve.splice(id,1);
    setTimeout(()=>{
      localStorage.setItem("memoArchive", JSON.stringify(this.memoArchieve));
    },0);
  }
  /**
   * @function getFavs
   * @return return all memos with favorite flags
   */
  getFavs(){
    let memos:Array<Memo> = this.memos.filter(memo=>{
      return memo.favorite === true;
    });
    if(memos) return memos;
  }
}
/** 
 * @interface MemoInterface
 * @prop id <Number>
 * @prop memo <String>
 * @prop favorite<Boolean>
 * @prop date<String> : Date string
 * @prop date<Date> : Date object
*/
interface MemoInterface {
  id:Number;
  memo: String;
  favorite:Boolean;
  date: String;
  time: String;
}
/**
 * @class Memo
 * @implements MemoInterface
 * @description Gives the interface object notation
 */
export class Memo implements MemoInterface{
  id:Number;
  memo: String;
  favorite:Boolean;
  dateTime:Date;
  date: String;
  time: String;   
  constructor(id:Number, memo:String, favorite:Boolean= false){
    let months:Array<String> = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Nov","Dec"];
    this.id = id;
    this.memo = memo;
    this.favorite = favorite;
    let date =this.dateTime =new Date;
    this.date = "On " + months[date.getDay()]+ " " + date.getDate() + ", " + date.getFullYear();
    this.time = `At ${date.getHours()} Hours & ${date.getMinutes()} Minutes`;
  }
}