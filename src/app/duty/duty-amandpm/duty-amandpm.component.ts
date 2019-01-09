import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {StorageService} from "../../services/storage.service"
import {DutyService} from "../duty.service";
import Clone from '../../utils/common.util';
import {BasePage} from "../../base.page";
@Component({
  selector: 'app-duty-amandpm',
  templateUrl: './duty-amandpm.component.html',
  styleUrls: ['./duty-amandpm.component.scss']
})
export class DutyAmandpmComponent extends  BasePage implements OnInit {
  @Output() closeAmandpm=new EventEmitter();
  @Output() currentd=new EventEmitter();
  date;
  userId;
  currentOrgForAm;
  currentOrgForPm;
  policysAm;
  policysPm;
  submitData;
  organizations;
  currentMonthData;
  constructor(
    public storageService:StorageService,
    public dutyService:DutyService
  ) {
    super();
  }
  ngOnInit(){
    this.currentOrgForAm='';
    this.currentOrgForPm='';
    this.userId= this.storageService.getCurrentLoginUserId('userid');
    this.submitData={
      policyam:[],
      policypm:[],
    }
    this.date=JSON.parse(this.storageService.getCurrentDate('date'))
    this.initPolicy();
    if(this.storageService.getPolicys('policys')){
      this.policysAm=JSON.parse(this.storageService.getPolicys('policys'));
      this.policysPm=this.deepClone(this.policysAm);
      for(let i=0;i<this.policysAm.length;i++){
        this.policysAm[i].checked=false;
        this.policysPm[i].checked=false;
        this.policysAm[i].planDayType='1';
        this.policysPm[i].planDayType='2';
      }
      if(this.storageService.getCurrnetMonthData('currentmonthdata')){
        this.currentMonthData = JSON.parse(this.storageService.getCurrnetMonthData('currentmonthdata'));
        let index = this.storageService.getIndex('index');
        let preSelectPolicysAm = this.currentMonthData[index].currentMonthData.policys.am;
        let preSelectPolicysPm = this.currentMonthData[index].currentMonthData.policys.pm;
        console.log(preSelectPolicysPm)
        for(let i=0;i<preSelectPolicysAm.length;i++){
          for(let j=0;j<this.policysAm.length;j++){
            if(preSelectPolicysAm[i].userId === this.policysAm[j].userId){
              this.policysAm[j].checked=true;
            }
          }
        }
        for(let i =0;i<preSelectPolicysPm.length;i++){
          for(let j=0;j<this.policysPm.length;j++){
            if(preSelectPolicysPm[i].userId === this.policysPm[j].userId){
              this.policysPm[j].checked = true
            }
          }
        }
      }
    }else{
      // this.showLoading();
      this.dutyService.getScheduleUserForPolicy({principalId:'3',userId:this.userId}).subscribe(data=>{
        // this.hideLoading();
        this.storageService.setPolicys('policys',data.data);
        this.policysAm=data.data;
        this.policysPm=this.deepClone(data.data);
        for(let i=0;i<this.policysAm.length;i++){
          this.policysAm[i].checked=false;
          this.policysAm[i].checked=false;
          this.policysPm[i].planDayType='1';
          this.policysPm[i].planDayType='2';
        }
        if(this.storageService.getCurrnetMonthData('currentmonthdata')){
          this.currentMonthData = JSON.parse(this.storageService.getCurrnetMonthData('currentmonthdata'));
          let index = this.storageService.getIndex('index');
          let preSelectPolicysAm = this.currentMonthData[index].currentMonthData.policys.am;
          let preSelectPolicysPm = this.currentMonthData[index].currentMonthData.policys.pm;
          for(let i=0;i<preSelectPolicysAm.length;i++){
            for(let j=0;j<this.policysAm.length;j++){
              if(preSelectPolicysAm[i].userId === this.policysAm[j].userId){
                this.policysAm[j].checked=true;
              }
            }
          }
          for(let i =0;i<preSelectPolicysPm.length;i++){
            for(let j=0;j<this.policysPm.length;j++){
              if(preSelectPolicysPm[i].userId === this.policysPm[j].userId){
                this.policysPm[j].checked = true
              }
            }
          }
        }
      },(err:Error)=>{
        // this.hideLoading();
        // this.alert(err)
      })
    }
    if(this.storageService.getOrgs('orgs')){
      this.organizations=JSON.parse(this.storageService.getOrgs('orgs'));
    }else{
      // this.showLoading();
      this.dutyService.getOrg({userId:this.userId}).subscribe(data=>{
        this.organizations=data.data;
        this.organizations.unshift({orgId:'',orgName:'全部机构'})
        this.storageService.setOrgs('orgs',data.data);
      },(err:Error)=>{
        // this.hideLoading();
        // this.alert(err);
      })
    }
  }
  changePeopleforAmOrg(orgId){
     this.dutyService.getScheduleUserForOrg({userId:this.userId,principalId:'3',orgId:orgId}).subscribe(data=>{
        this.policysAm=data.data;
       for(let i=0;i<this.policysAm.length;i++){
         this.policysAm[i].checked=false;
         this.policysAm[i].planDayType='1';
       }
     })
  }
  changePeopleforPmOrg(orgId){
    this.dutyService.getScheduleUserForOrg({userId:this.userId,principalId:'3',orgId:orgId}).subscribe(data=>{
       this.policysPm=data.data;
      for(let i=0;i<this.policysPm.length;i++){
        this.policysPm[i].checked=false;
        this.policysPm[i].planDayType='2';
      }
    })
  }
  closeDutyAmandpm(boolean){
    this.closeAmandpm.emit(boolean)
  }
  deepClone(obj){
    var o,i,j,k;
    if(typeof(obj)!="object" || obj===null)return obj;
    if(obj instanceof(Array))
    {
      o=[];
      i=0;j=obj.length;
      for(;i<j;i++)
      {
        if(typeof(obj[i])=="object" && obj[i]!=null)
        {
          o[i]=this.deepClone(obj[i]);
        }
        else
        {
          o[i]=obj[i];
        }
      }
    }
    else
    {
      o={};
      for(i in obj)
      {
        if(typeof(obj[i])=="object" && obj[i]!=null)
        {
          o[i]=this.deepClone(obj[i]);
        }
        else
        {
          o[i]=obj[i];
        }
      }
    }
    return o;
  }
  chooseAmPolicys(boolean,index){
    for(let i = 0;i<this.policysAm.length;i++){
      if(i === index){
        this.policysAm[i].checked=!boolean;
      }
    }
  }
  choosePmPolicys(boolean,index){
    for(let i = 0;i<this.policysPm.length;i++){
      if(i === index){
        this.policysPm[i].checked = !boolean;
      }
    }
  }
  submitCurrentDateData(boolean){
    this.submitData.policyam=[];
    this.submitData.policypm=[];
    for(let i=0;i<this.policysAm.length;i++){
      if(this.policysAm[i].checked === true){
        this.submitData.policyam.push(this.policysAm[i])
      }
    }
    for(let i=0;i<this.policysPm.length;i++){
      if(this.policysPm[i].checked === true){
        this.submitData.policypm.push(this.policysPm[i])
      }
    }
    if(this.submitData.policypm.length!=this.submitData.policyam.length){
      // this.alert('请选择相同人数的早晚班');
      return;
    }
    if(this.submitData.policyam.length>3&&this.submitData.policypm.length>3){
      // this.alert('最多只能选择三个民警');
      return ;
    }
    this.currentd.emit(this.submitData)
    this.closeAmandpm.emit(boolean)
  }
  resetAllPeople(){
    for(let i=0;i<this.policysAm.length;i++){
      this.policysAm[i].checked = false
    }
    for(let i=0;i<this.policysPm.length;i++){
      this.policysPm[i].checked = false;
    }
  }
  initPolicy(){
    this.dutyService.getSchedulePerson().subscribe(dutyPerson=>{
      this.policysAm = Clone.deepClone(dutyPerson['policys']);
      this.policysPm = Clone.deepClone(dutyPerson['policys']);
    })
  }
}
