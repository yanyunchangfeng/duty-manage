import { Component, OnInit,Output ,EventEmitter} from '@angular/core';
import {DutyService} from "../duty.service";
import {StorageService} from "../../services/storage.service";
@Component({
  selector: 'app-duty-auto',
  templateUrl: './duty-auto.component.html',
  styleUrls: ['./duty-auto.component.scss']
})
export class DutyAutoComponent implements OnInit {
  @Output() closeDutyAuto=new EventEmitter<boolean>();
  @Output() saveCurrentMonthData = new EventEmitter();
  userId;
  leaders=[];
  devisions = [];
  sections = [];
  policys = [];
  autoLeaderIndex = 0;
  autoDevisionIndex = 0;
  autoSectionIndex = 0;
  // autoSelectLeader = [];
  // autoSelectDevision = [];
  // autoSelectSection = [];
  // autoSelectPolicy = [];
  constructor(
    public dutyService:DutyService,
    public storageService:StorageService
  ) { }
  ngOnInit() {
    this.userId = this.storageService.getCurrentLoginUserId('userid');
    this.initDutyPerson();
    /*
    if(this.storageService.getLeaders('leaders')){
      this.leaders = JSON.parse(this.storageService.getLeaders('leaders'));
      for(let i=0;i<this.leaders.length;i++){
        this.leaders[i].planDayType='0'
        if(i===0){
          this.autoSelectLeader.push({selected:true})
        }else{
          this.autoSelectLeader.push({selected:false})
        }
      }
      this.storageService.setAutoLeaderIndex('autoleaderindex',0)
      console.log(this.autoSelectLeader)
    }else{
      this.dutyService.getScheduleUserForLeader({principalId:'0',userId:this.userId}).subscribe(data=>{
        this.storageService.setLeaders('leaders',data.data);
        this.leaders = data.data;
        for(let i=0;i<this.leaders.length;i++){
          this.leaders[i].planDayType='0'
          if(i===0){
            this.autoSelectLeader.push({selected:true})
          }else{
            this.autoSelectLeader.push({selected:false})
          }
        }
        this.storageService.setAutoLeaderIndex('autoleaderindex',0)
      })
    }
    if(this.storageService.getDevisions('devisions')){
      this.devisions = JSON.parse(this.storageService.getDevisions('devisions'));
      for(let i=0;i<this.devisions.length;i++){
        this.devisions[i].planDayType='0';
        if(i === 0){
          this.autoSelectDevision.push({selected:true})
        }else{
          this.autoSelectDevision.push({selected:false})
        }
      }
      this.storageService.setAutoDevisionIndex('autodevisionindex',0)
    }else{
      this.dutyService.getScheduleUserForDevisionChief({principalId:'1',userId:this.userId}).subscribe(data=>{
        this.storageService.setDevisions('devisions',data.data);
        this.devisions = data.data;
        for(let i=0;i<this.devisions.length;i++){
          this.devisions[i].planDayType='0'
          if(i === 0){
            this.autoSelectDevision.push({selected:true})
          }else{
            this.autoSelectDevision.push({selected:false})
          }
        }
        this.storageService.setAutoDevisionIndex('autodevisionindex',0)

      })
    }
    if(this.storageService.getSections('sections')){
      this.sections = JSON.parse(this.storageService.getSections('sections'));
      for(let i= 0;i<this.sections.length;i++){
        this.sections[i].planDayType='0';
        if(i < 2){
          this.autoSelectSection.push({selected:true})
        }else{
          this.autoSelectSection.push({selected:false})
        }
      }
      this.storageService.setAutoSectionIndex('autosectionindex',0)
    }else{
      this.dutyService.getScheduleUserForSectionChief({principalId:'2',userId:this.userId}).subscribe(data=>{
        this.storageService.setSections('sections',data.data);
        this.sections = data.data;
        for(let i= 0;i<this.sections.length;i++){
          this.sections[i].planDayType='0'
          if(i < 2){
            this.autoSelectSection.push({selected:true})
          }else{
            this.autoSelectSection.push({selected:false})
          }
        }
        this.storageService.setAutoSectionIndex('autosectionindex',0)
      })
    }
    */
  }
  close(bool){
    this.closeDutyAuto.emit(bool)
  }
  changeAutoLeader(index){
    // this.storageService.setAutoSectionIndex('autoleaderindex',index)
    //  for(let i=0;i<this.autoSelectLeader.length;i++){
    //    this.autoSelectLeader[i].selected = false;
    //  }
    //  this.autoSelectLeader[index].selected = true;
    this.leaders.forEach(item=>item.selected = false);
    this.leaders[index].selected = true;
    this.autoLeaderIndex = index;
  }
  changeAutoDevision(index){
    // this.storageService.setAutoDevisionIndex('autodevisionindex',index)
    //  for(let i=0;i<this.autoSelectDevision.length;i++){
    //    this.autoSelectDevision[i].selected = false;
    //  }
    //  this.autoSelectDevision[index].selected = true;

    this.devisions.forEach(item=>item.selected = false);
    this.devisions[index].selected = true;
    this.autoDevisionIndex = index;
  }
  changeAutoSection(index){
    // this.storageService.setAutoSectionIndex('autosectionindex',index)
    //  for(let i=0;i<this.autoSelectSection.length;i++){
    //    this.autoSelectSection[i].selected = false;
    //  }
    // if(index+1 === this.autoSelectSection.length){
    //   this.autoSelectSection[index].selected = !this.autoSelectSection[index].selected;
    //   this.autoSelectSection[0].selected = !this.autoSelectSection[0].selected;
    // }else{
    //   this.autoSelectSection[index].selected = !this.autoSelectSection[index].selected;
    //   this.autoSelectSection[index+1].selected = !this.autoSelectSection[index+1].selected;
    // }
    this.sections.forEach(item=>item.selected = false);
    if(index+1 === this.sections.length){
      this.sections[index].selected = true;
      this.sections[0].selected = true;
    }else{
      this.sections[index].selected = true;
      this.sections[index+1].selected = true;
    }
    this.autoSectionIndex = index;
  }
  submitData(boolean){
    // let autoChooseLeaderIndex = this.getCurrentChooseLeaderIndex();
    // let autoChooseDevisionIndex = this.getCurrentChooseDevisionIndex();
    // let autoChooseSectionIndex = this.getCurrentChooseSectionIndex();

    let month=parseInt(this.storageService.getCurrentDate('date'));
    let currentMonthData=JSON.parse(this.storageService.getCurrentDate('currentmonthdata'));
    let monthDays = 0;
    let preLeaderNum = 1;
    let preDevisionNum = 1;
    let preSectionNum = 2;
    for(let i=0;i<currentMonthData.length;i++){
      currentMonthData[i].currentMonthData.sections=[];
      currentMonthData[i].currentMonthData.leaders=[];
      currentMonthData[i].currentMonthData.devisions=[];
      if(currentMonthData[i].month==month){
        monthDays+=1;
      }
    }
    let totalLeaderNum = preLeaderNum * monthDays;
    let totalDevisionNum = preDevisionNum * monthDays;
    let totalSectionNum = preSectionNum * monthDays;
    let leaderNum =this.autoLeaderIndex;
    let devisionNum =this.autoDevisionIndex;
    let sectionNum =this.autoSectionIndex;
    let leaderArray= new Array(totalLeaderNum);
    let devisionArray= new Array(totalDevisionNum);
    let sectionArray= new Array(totalSectionNum);
    let leadercount=0;
    let devisioncount=0;
    let sectioncount=1;
    //领导自动排班
    for(let i=0;i<totalLeaderNum;i++){
      if(leaderNum<this.leaders.length){
        leaderArray[i]=this.leaders[leaderNum++]
      }else{
        leaderNum=0;
        leaderArray[i]=this.leaders[leaderNum++]
      }
    }
    for(let i=0;i<currentMonthData.length;i++){
      if(month==currentMonthData[i].month){
        for(let j=leadercount;j<monthDays;j++){
          currentMonthData[i].currentMonthData.leaders.push(leaderArray[j-1+1])
          // currentMonthData[i].currentMonthData.policys.push(arr[j*2-1])
          leadercount++;
          break;
        }
      }
    }
    //处长自动排班
    for(let i=0;i<totalDevisionNum;i++){
      if(devisionNum<this.devisions.length){
        devisionArray[i]=this.devisions[devisionNum++]
      }else{
        devisionNum=0;
        devisionArray[i]=this.devisions[devisionNum++]
      }
    }
    for(let i=0;i<currentMonthData.length;i++){
      if(month==currentMonthData[i].month){
        for(let j=devisioncount;j<monthDays;j++){
          currentMonthData[i].currentMonthData.devisions.push(devisionArray[j-1+1])
          // currentMonthData[i].currentMonthData.policys.push(arr[j*2-1])
          devisioncount++;
          break;
        }
      }
    }
    //科长自动排班
    for(let i=0;i<totalSectionNum;i++){
      if(sectionNum<this.sections.length){
        sectionArray[i]=this.sections[sectionNum++]
      }else{
        sectionNum=0;
        sectionArray[i]=this.sections[sectionNum++]
      }
    }
    for(let i=0;i<currentMonthData.length;i++){
      if(month==currentMonthData[i].month){
        for(let j=sectioncount;j<=monthDays;j++){
          currentMonthData[i].currentMonthData.sections.push(sectionArray[(j-1)*2])
          currentMonthData[i].currentMonthData.sections.push(sectionArray[j*2-1])
          sectioncount++;
          break;
        }
      }
    }
    this.saveCurrentMonthData.emit(currentMonthData);
    this.closeDutyAuto.emit(boolean)
  }
  resetAutoDuty(){
    this.initAutoSelected(this.leaders,1);
    this.initAutoSelected(this.devisions,1);
    this.initAutoSelected(this.sections,2);
  }
  initDutyPerson(){
    this.dutyService.getSchedulePerson().subscribe(dutyPerson=>{
      this.leaders = dutyPerson['leaders'];
      this.devisions = dutyPerson['devisions'];
      this.sections = dutyPerson['sections'];
      this.initAutoSelected(this.leaders,1);
      this.initAutoSelected(this.devisions,1);
      this.initAutoSelected(this.sections,2);
    })
  }
  initAutoSelected(arr,preNum){
     arr.forEach((item,index) => {
       if(preNum>1){
          if(index<2){
            item.selected = true;
          }else{
            item.selected = false;
          }
       }else{
        if(index===0){
          item.selected = true;
        }else{
          item.selected = false;
        }
       }
     });
  }
}
