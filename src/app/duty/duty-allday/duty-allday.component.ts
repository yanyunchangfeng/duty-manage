import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import {StorageService} from "../../services/storage.service"
import {DutyService} from "../duty.service";
import {BasePage} from "../../base.page";
@Component({
  selector: 'app-duty-allday',
  templateUrl: './duty-allday.component.html',
  styleUrls: ['./duty-allday.component.scss']
})
export class DutyAlldayComponent extends BasePage implements OnInit {
  @Output() closeDutyAll=new  EventEmitter();
  @Output() currentDateData=new EventEmitter();
  date;
  leaders = [];
  userId;
  devisionsChiefs = [];
  sectionChiefs = [];
  submitData;
  currentMonthData;
  constructor(
    public storageService:StorageService,
    public dutyService:DutyService,
  ) {super() }
  ngOnInit() {
    this.date=JSON.parse(this.storageService.getCurrentDate('date'));
    this.userId = this.storageService.getCurrentLoginUserId('userid');
    this.submitData={
      leaders:[],
      devisions:[],
      sections:[]
    }
    this.initDutyPerson();
    if(this.storageService.getLeaders('leaders')){
      this.leaders=JSON.parse(this.storageService.getLeaders('leaders'));
      for(let i=0;i<this.leaders.length;i++){
        this.leaders[i].checked=false;
        this.leaders[i].planDayType='0'
      }
      if(this.storageService.getCurrnetMonthData('currentmonthdata')){
        this.currentMonthData=JSON.parse(this.storageService.getCurrnetMonthData('currentmonthdata'));
        let index = this.storageService.getIndex('index');
        let preSelectLeaders = this.currentMonthData[index].currentMonthData.leaders;
        for(let i=0;i<preSelectLeaders.length;i++){
          for(let j=0;j<this.leaders.length;j++){
            if(preSelectLeaders[i].userId === this.leaders[j].userId){
              this.leaders[j].checked=true;
            }
          }
        }
      }
    }else{
      // this.showLoading();
      this.dutyService.getScheduleUserForLeader({principalId:'0',userId:this.userId}).subscribe(data=>{
        // this.hideLoading();
        this.storageService.setLeaders('leaders',data.data)
        this.leaders=data.data;
        for(let i=0;i<this.leaders.length;i++){
          this.leaders[i].checked=false;
          this.leaders[i].planDayType='0'
        }
        if(this.storageService.getCurrnetMonthData('currentmonthdata')){
          this.currentMonthData=JSON.parse(this.storageService.getCurrnetMonthData('currentmonthdata'));
          let index = this.storageService.getIndex('index');
          let preSelectLeaders = this.currentMonthData[index].currentMonthData.leaders;
          for(let i=0;i<preSelectLeaders.length;i++){
            for(let j=0;j<this.leaders.length;j++){
              if(preSelectLeaders[i].userId === this.leaders[j].userId){
                this.leaders[j].checked=true;
              }
            }
          }
        }
      },(err:Error)=>{
        // this.hideLoading();
        // this.alert(err);
      });
    }
    if(this.storageService.getDevisions('devisions')){
      this.devisionsChiefs=JSON.parse(this.storageService.getDevisions('devisions'));
      for(let i=0;i<this.devisionsChiefs.length;i++){
        this.devisionsChiefs[i].checked=false;
        this.devisionsChiefs[i].planDayType='0'
      }
      if(this.storageService.getCurrnetMonthData('currentmonthdata')){
        this.currentMonthData=JSON.parse(this.storageService.getCurrnetMonthData('currentmonthdata'));
        let index = this.storageService.getIndex('index');
        let preSelectDevisions = this.currentMonthData[index].currentMonthData.devisions;
        for(let i=0;i<preSelectDevisions.length;i++){
          for(let j=0;j<this.devisionsChiefs.length;j++){
            if(preSelectDevisions[i].userId === this.devisionsChiefs[j].userId){
              this.devisionsChiefs[j].checked=true;
            }
          }
        }
      }
    } else{
      // this.showLoading();
        this.dutyService.getScheduleUserForDevisionChief({principalId:'1',userId:this.userId}).subscribe(data=>{
          // this.hideLoading();
          this.storageService.setDevisions('devisions',data.data);
          this.devisionsChiefs=data.data;
          for(let i=0;i<this.devisionsChiefs.length;i++){
            this.devisionsChiefs[i].checked=false;
            this.devisionsChiefs[i].planDayType='0'
          }
          if(this.storageService.getCurrnetMonthData('currentmonthdata')){
            this.currentMonthData=JSON.parse(this.storageService.getCurrnetMonthData('currentmonthdata'));
            let index = this.storageService.getIndex('index');
            let preSelectDevisions = this.currentMonthData[index].currentMonthData.devisions;
            for(let i=0;i<preSelectDevisions.length;i++){
              for(let j=0;j<this.devisionsChiefs.length;j++){
                if(preSelectDevisions[i].userId === this.devisionsChiefs[j].userId){
                  this.devisionsChiefs[j].checked=true;
                }
              }
            }
          }
      },(err:Error)=>{
          // this.hideLoading();
          // this.alert(err);
        });
     }
    if(this.storageService.getSections('sections')){
      this.sectionChiefs=JSON.parse(this.storageService.getSections('sections'));
      for(let i=0;i<this.sectionChiefs.length;i++){
        this.sectionChiefs[i].checked=false;
        this.sectionChiefs[i].planDayType='0'
      }
      if(this.storageService.getCurrnetMonthData('currentmonthdata')){
        this.currentMonthData=JSON.parse(this.storageService.getCurrnetMonthData('currentmonthdata'));
        let index = this.storageService.getIndex('index');
        let preSelectSections = this.currentMonthData[index].currentMonthData.sections;
        for(let i=0;i<preSelectSections.length;i++){
          for(let j=0;j<this.sectionChiefs.length;j++){
            if(preSelectSections[i].userId===this.sectionChiefs[j].userId){
              this.sectionChiefs[j].checked=true;
            }
          }
        }
      }
    } else{
      // this.showLoading();
        this.dutyService.getScheduleUserForSectionChief({principalId:'2',userId:this.userId}).subscribe(data=>{
          // this.hideLoading();
          this.storageService.setSections('sections',data.data)
          this.sectionChiefs=data.data;
          for(let i=0;i<this.sectionChiefs.length;i++){
            this.sectionChiefs[i].checked=false;
            this.sectionChiefs[i].planDayType='0'
          }
          if(this.storageService.getCurrnetMonthData('currentmonthdata')){
            this.currentMonthData=JSON.parse(this.storageService.getCurrnetMonthData('currentmonthdata'));
            let index = this.storageService.getIndex('index');
            let preSelectSections = this.currentMonthData[index].currentMonthData.sections;
            for(let i=0;i<preSelectSections.length;i++){
              for(let j=0;j<this.sectionChiefs.length;j++){
                if(preSelectSections[i].userId===this.sectionChiefs[j].userId){
                  this.sectionChiefs[j].checked=true;
                }
              }
            }
          }
        },(err:Error)=>{
          // this.hideLoading();
          // this.alert(err);
        });
    }
  }
  closeDutyAllDay(boolean){
    this.closeDutyAll.emit(boolean)
  }
  chooseLeader(boolean,index){
      for(let i=0;i<this.leaders.length;i++){
        if(i===index){
          this.leaders[i].checked=!boolean;
        }
      }
  }
  chooseDevision(boolean,index){
      for(let i=0;i<this.devisionsChiefs.length;i++){
        if(i===index){
          this.devisionsChiefs[i].checked=!boolean;
        }
      }
  }
  chooseSection(boolean,index){
      for(let i=0;i<this.sectionChiefs.length;i++){
        if(i===index){
          this.sectionChiefs[i].checked=!boolean;
        }
      }
  }
  submitCurrentDateData(boolean){
    this.submitData.leaders=[];
    this.submitData.devisions=[];
    this.submitData.sections=[];
    for(let i=0;i<this.leaders.length;i++){
      if(this.leaders[i].checked==true){
          this.submitData.leaders.push(this.leaders[i])
      }
    }
    for(let i=0;i<this.devisionsChiefs.length;i++){
      if(this.devisionsChiefs[i].checked==true){
          this.submitData.devisions.push(this.devisionsChiefs[i])
      }
    }
    for(let i=0;i<this.sectionChiefs.length;i++){
      if(this.sectionChiefs[i].checked==true){
          this.submitData.sections.push(this.sectionChiefs[i])
      }
    }
    if(this.submitData.leaders.length>1){
      // this.alert('只能选择一位领导！');
      return;
    }
    if(this.submitData.devisions.length>1){
      // this.alert('只能选择一位处长！');
      return;
    }
    if(this.submitData.sections.length>2||this.submitData.sections.length==1){
      // this.alert('只能选择两位科长!');
      return
    }
    this.currentDateData.emit(this.submitData)
    this.closeDutyAll.emit(boolean)
  }
  resetAllPeople(){
    for(let i=0;i<this.leaders.length;i++){
      this.leaders[i].checked=false;
    }
    for(let i=0;i<this.devisionsChiefs.length;i++){
      this.devisionsChiefs[i].checked=false;
    }
    for(let i=0;i<this.sectionChiefs.length;i++){
      this.sectionChiefs[i].checked=false;
    }
  }
  initDutyPerson(){
    this.dutyService.getSchedulePerson().subscribe((dutyPerson)=>{
      this.leaders = dutyPerson['leaders'];
      this.devisionsChiefs = dutyPerson['devisions'];
      this.sectionChiefs = dutyPerson['sections'];
    })
  }
}
