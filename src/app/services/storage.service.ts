import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }
  setIndex(key,val){
    window.sessionStorage.setItem(key,val)
  }
  getIndex(key){
   return window.sessionStorage.getItem(key)
  }
  setCurrentDate(key,val){
    if(typeof val==='object'){
      val=JSON.stringify(val)
    }
    window.sessionStorage.setItem(key,val)
  }
  getCurrentDate(key){
    return window.sessionStorage.getItem(key)
  }
  setCurrentMonthData(key,val){
    if(typeof val=='object'){
      val=JSON.stringify(val)
    }
    window.sessionStorage.setItem(key,val)
  }
  getCurrnetMonthData(key){
    return window.sessionStorage.getItem(key)
  }
  removeCurrentMonthData(key){
    window.sessionStorage.removeItem(key)
  }
  setLeaders(key,val){
    if(typeof val=='object'){
      val=JSON.stringify(val)
    }
    window.sessionStorage.setItem(key,val)
  }
  getLeaders(key){
    return window.sessionStorage.getItem(key)
  }
  setDevisions(key,val){
    if(typeof val=='object'){
      val=JSON.stringify(val)
    }
    window.sessionStorage.setItem(key,val)
  }
  getDevisions(key){
    return window.sessionStorage.getItem(key);
  }
  setSections(key,val){
    if(typeof val=='object'){
      val=JSON.stringify(val)
    }
    window.sessionStorage.setItem(key,val)
  }
  getSections(key){
    return window.sessionStorage.getItem(key)
  }
  setPolicys(key,val){
    if(typeof val=='object'){
      val=JSON.stringify(val)
    }
    window.sessionStorage.setItem(key,val)
  }
  getPolicys(key){
    return window.sessionStorage.getItem(key)
  }
  setOrgs(key,val){
    if(typeof val=='object'){
      val=JSON.stringify(val)
    }
    window.sessionStorage.setItem(key,val)
  }
  getOrgs(key){
    return window.sessionStorage.getItem(key)
  }
  setAutoLeaderIndex(key,val){
    window.sessionStorage.setItem(key,val)
  }
  getAutoLeaderIndex(key){
    return window.sessionStorage.getItem(key)
  }
  setAutoDevisionIndex(key,val){
    window.sessionStorage.setItem(key,val)
  }
  getAutoDevisionIndex(key){
    return window.sessionStorage.getItem(key)
  }
  setAutoSectionIndex(key,val){
    window.sessionStorage.setItem(key,val)
  }
  getAutoSectionIndex(key){
    return window.sessionStorage.getItem(key)
  }
  setCurrentLoginUserId(key,val){
    window.sessionStorage.setItem(key,val);
  }
  getCurrentLoginUserId(key){
    return window.sessionStorage.getItem(key);
  }
}
