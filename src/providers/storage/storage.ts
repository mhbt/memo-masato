import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class StorageProvider {
  memos:Array<Memo>=[];
  memoArchieve:Array<Memo>=[];
  constructor(public http: HttpClient) {
    console.log('Hello StorageProvider Provider');
    // this.memos = [new Memo({})];
    // this.memoArchieve = [new Memo()];
    
  }
  getArchieve(){
    return this.memoArchieve;
  }
  loadMemos(){
    let memos = localStorage.getItem("memos");
    if(memos){
      this.memos = JSON.parse(memos);
    }
  }
  loadArchieve(){
    let memoArchieve = localStorage.getItem("memoArchive");
    if(memoArchieve){
      this.memoArchieve = JSON.parse(memoArchieve);
    }
  }
  getMemos(){
    return this.memos;
  }
  addMemo(memo){
    this.memos.unshift(new Memo(this.memos.length, memo.memo, memo.favorite));
    setTimeout(()=>{
      localStorage.setItem("memos", JSON.stringify(this.memos));
    },0);
  }
  addArcheive(memo){
    this.memoArchieve.unshift(new Memo(this.memos.length, memo.memo, memo.favorite));
    setTimeout(()=>{
      localStorage.setItem("memoArchive", JSON.stringify(this.memoArchieve));
    },0);
  }
  getMemo(id){
    return this.memos[+id];
  }
  getArchieveMemo(id){
   return this.memoArchieve[+id];
  }
  toggleFavorite(index){
    this.memos[index].favorite = !this.memos[index].favorite;
    setTimeout(()=>{
      localStorage.setItem("memos", JSON.stringify(this.memos));
    },0);
  }
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
  memoToArchive(id){
    let memo:Memo = this.memos[id];
    this.memos.splice(id,1);
    this.addArcheive(memo);
    setTimeout(()=>{
      localStorage.setItem("memos", JSON.stringify(this.memos));
    },0);
  }
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
  removeArchieveMemo(id){
    this.memoArchieve.splice(id,1);
    setTimeout(()=>{
      localStorage.setItem("memoArchive", JSON.stringify(this.memoArchieve));
    },0);
  }
  getFavs(){
    let memos:Array<Memo> = this.memos.filter(memo=>{
      return memo.favorite === true;
    });
    if(memos) return memos;
  }
}

interface MemoInterface {
  id:Number;
  memo: String;
  favorite:Boolean;
  date: String;
  time: String;
}
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