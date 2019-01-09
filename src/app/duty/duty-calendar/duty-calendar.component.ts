import { Component, OnInit } from '@angular/core';
import {DutyService} from '../duty.service';
import {StorageService} from '../../services/storage.service';
import {BasePage} from '../../base.page';
@Component({
  selector: 'app-duty-calendar',
  templateUrl: './duty-calendar.component.html',
  styleUrls: ['./duty-calendar.component.scss']
})
export class DutyCalendarComponent extends BasePage implements OnInit {
  userId;
  dutyDate  = new Date();
  MonthData;
  year;
  month;
  planTime;
  showAllDayMask:boolean = false;
  showAmAndPmMask:boolean = false;
  showAutoDutyMask:boolean = false;
  submitMonthData;
  constructor(
    public dutyService:DutyService,
    public storageService:StorageService
  ) {
    super();
  }
  ngOnInit() {
    // this.showLoading();
    this.userId = this.storageService.getCurrentLoginUserId('userid');
    this.storageService.removeCurrentMonthData('currentmonthdata');
    this.year = this.dutyDate.getFullYear();
    this.month = this.dutyDate.getMonth() + 1;
    this.planTime = this.year + '-' + this.month;
    this.MonthData = this.getMonthData(this.year, this.month);
    console.log(this.MonthData,this.month)
    // for(let i=0;i<this.MonthData.length;i++){
    //   this.MonthData[i].currentMonthData={
    //     leaders:[],
    //     devisions:[],
    //     sections:[],
    //     policys:{
    //       am:[],
    //       pm:[],
    //     }
    //   }
    // }
    /*

    $('#dutyCalendar').calendar({
      type:'month',
      onChange:(date,text)=>{
        // this.showLoading()
        this.dutyDate=text;
        this.year=this.dutyDate.substr(3).trim();
        this.month=this.dutyDate.substr(0,2).trim();
        this.planTime=this.year+'-'+this.month;
        this.MonthData=this.getMonthData(this.year,this.month);
        for(let i=0;i<this.MonthData.length;i++){
          this.MonthData[i].currentMonthData={
            leaders:[],
            devisions:[],
            sections:[],
            policys:{
              am:[],
              pm:[],
            }
          }
        }
        this.submitMonthData= {
          planTime:this.year+'-'+this.month,
          userId:'a12229',
          gpsPlanType:'1',
          ScheduleUserVOs:[
            // {
            //   workUserId:'',
            //   principalId:'' ,
            //   planDay:'',
            //   planDayType:'',
            // }
          ]
        }
        this.dutyService.getPlanDuty({userId:this.userId,planTime:this.planTime,gpsPlanType:'1'}).subscribe(data=>{
          // this.hideLoading();
          console.log(data);
          let count = 0;
          for(let i=0;i<this.MonthData.length;i++){
            if(this.MonthData[i].month == this.month){
              for(let j=count;j<data.data.length;j++){
                let def = data.data[j];
                for(let k=0;k<def.dutyKZs.length;k++){
                  let section={};
                  section['userName']=def.dutyKZs[k];
                  section['userId']=def.dutyKZUserIds[k];
                  section['workUserId']=def.dutyKZWorkIds[k];
                  section['planDayType']= '0';
                  section['principalId']= '2';
                  section['checked']= true;
                  this.MonthData[i].currentMonthData.sections.push(section);
                }
                for(let k=0;k<def.dutyGJs.length;k++){
                  if(def.dutyGJs[k].dutyType=='1'){
                    let policy={};
                    policy['userId']=def.dutyGJs[k].dutyGJUserId;
                    policy['userName']=def.dutyGJs[k].dutyGJ;
                    policy['workUserId']=def.dutyGJs[k].dutyGJWorkId;
                    policy['principalId']= '3';
                    policy['planDayType']= '1';
                    policy['checked']= true;
                    this.MonthData[i].currentMonthData.policys.am.push(policy)
                  }else{
                    let policy={};
                    policy['userId']=def.dutyGJs[k].dutyGJUserId;
                    policy['userName']=def.dutyGJs[k].dutyGJ;
                    policy['workUserId']=def.dutyGJs[k].dutyGJWorkId;
                    policy['planDayType']= '2';
                    policy['principalId']= '3';
                    policy['checked']= true;
                    this.MonthData[i].currentMonthData.policys.pm.push(policy)
                  }
                }
                let leader={};
                leader['workUserId']=def.dutyLeaderWorkId;
                leader['userId']=def.dutyLeaderUserId;
                leader['userName']=def.dutyLeader;
                leader['planDayType']='0';
                leader['checked']=true;
                leader['principalId']='0';
                this.MonthData[i].currentMonthData.leaders.push(leader);
                let devision={};
                devision['workUserId']=def.dutyCZWorkId;
                devision['userId']=def.dutyCZUserId;
                devision['userName']=def.dutyCZ;
                devision['planDayType']='0';
                devision['principalId']='1';
                devision['checked']=true;
                this.MonthData[i].currentMonthData.devisions.push(devision);
                count++;
                break;
              }

            }
          }
          this.storageService.setCurrentMonthData('currentmonthdata',this.MonthData)
          console.log(this.MonthData)
        },(err:Error)=>{
          // this.hideLoading();
          // this.alert(JSON.parse(JSON.stringify(err)).status);
        })
      },
      text:this.text
    })

 */
    for(let i=0;i<this.MonthData.length;i++){
      this.MonthData[i].currentMonthData={
        leaders:[],
        devisions:[],
        sections:[],
        policys:{
          am:[],
          pm:[],
        }
      }
    }
    this.submitMonthData={
      planTime:this.year+'-'+this.month,
      userId:this.userId,
      gpsPlanType:'1',
      ScheduleUserVOs:[
        // {
        //   workUserId:'',
        //   principalId:'' ,
        //   planDay:'',
        //   planDayType:'',
        // }
      ]
    }
    this.dutyService.getPlanDuty({userId:this.userId,planTime:this.planTime,gpsPlanType:'1'}).subscribe(data=>{
      // this.hideLoading();
      console.log(data);
      let count = 0;
      for(let i=0;i<this.MonthData.length;i++){
        if(this.MonthData[i].month == this.month){
          for(let j=count;j<data.data.length;j++){
            let def = data.data[j];
            for(let k=0;k<def.dutyKZs.length;k++){
              let section={};
              section['userName']=def.dutyKZs[k];
              section['userId']=def.dutyKZUserIds[k];
              section['workUserId']=def.dutyKZWorkIds[k];
              section['planDayType']= '0';
              section['principalId']= '2';
              section['checked']= true;
              this.MonthData[i].currentMonthData.sections.push(section);
            }
            for(let k=0;k<def.dutyGJs.length;k++){
              if(def.dutyGJs[k].dutyType=='1'){
                let policy={};
                policy['userId']=def.dutyGJs[k].dutyGJUserId;
                policy['userName']=def.dutyGJs[k].dutyGJ;
                policy['workUserId']=def.dutyGJs[k].dutyGJWorkId;
                policy['principalId']= '3';
                policy['planDayType']= '1';
                policy['checked']= true;
                this.MonthData[i].currentMonthData.policys.am.push(policy)
              }else{
                let policy={};
                policy['userId']=def.dutyGJs[k].dutyGJUserId;
                policy['userName']=def.dutyGJs[k].dutyGJ;
                policy['workUserId']=def.dutyGJs[k].dutyGJWorkId;
                policy['planDayType']= '2';
                policy['principalId']= '3';
                policy['checked']= true;
                this.MonthData[i].currentMonthData.policys.pm.push(policy)
              }
            }
            let leader={};
            leader['workUserId']=def.dutyLeaderWorkId;
            leader['userId']=def.dutyLeaderUserId;
            leader['userName']=def.dutyLeader;
            leader['planDayType']='0';
            leader['checked']=true;
            leader['principalId']='0';
            this.MonthData[i].currentMonthData.leaders.push(leader);
            let devision={};
            devision['workUserId']=def.dutyCZWorkId;
            devision['userId']=def.dutyCZUserId;
            devision['userName']=def.dutyCZ;
            devision['planDayType']='0';
            devision['principalId']='1';
            devision['checked']=true;
            this.MonthData[i].currentMonthData.devisions.push(devision);
            count++;
            break;
          }

        }
      }
      this.storageService.setCurrentMonthData('currentmonthdata',this.MonthData)
      console.log(this.MonthData)
    },(err:Error)=>{
      // this.hideLoading();
      // this.alert(JSON.parse(JSON.stringify(err)).status);
    })
  }
  getMonthData(year,month){
    var ret=[];
    if(!year||!month){
      var today=new Date()
      year=today.getFullYear();
      month=today.getMonth()+1;
    }
    var firstDay=new Date(year,month-1,1);
    var firstDayWeekDay=firstDay.getDay();
    if(firstDayWeekDay===0)
      firstDayWeekDay=7
    var lastDayofLastMonth=new Date(year,month-1,0);
    var lastDateOfLastMonth=lastDayofLastMonth.getDate();
    var preMonthDayCount=firstDayWeekDay-1;
    var lastDay=new Date(year,month,0);
    var lastDate=lastDay.getDate();
    month=parseInt(month)
    for(var i=0;i<6*7;i++){
      var date=i+1-preMonthDayCount;
      var showDate=date;
      var thisMonth=month;
      if(date<=0){
        thisMonth=month-1;
        showDate=lastDateOfLastMonth+date;
      }else if(date>lastDate){
        thisMonth=month+1;
        showDate=showDate-lastDate
      }
      if(thisMonth==0)thisMonth=12;
      if(thisMonth==13)thisMonth=1;
      ret.push({
        year:year,
        month:thisMonth,
        date:date,
        showDate:showDate,
        showSelectType:false,
        showAddIcon:true,
        selectTypeValue:[
          {key:'0',value:'请选择'},
          {key:'1',value:'全天候'},
          {key:'2',value:'早晚班'}
          ],
        dutytypevalue:'0'
      })
    }
    return ret;
  }
  showSelectDutyType(index){
    for(let i=0;i<this.MonthData.length;i++){
      if(index===i){
        this.MonthData[i].showAddIcon=false;
        this.MonthData[i].showSelectType=true;
        break;
      }
    }
  }
  chooseTypeForMask(type,i,date){
    this.storageService.setIndex('index',i);
    this.storageService.setCurrentDate('date',date)
    switch (type){
      case '1':
        this.showAllDayMask=true;
        break;
      case '2':
        this.showAmAndPmMask=true
      }
  }
  closeDutyAllDayMask(boolean)
  {
    this.showAllDayMask=boolean
    let index=this.storageService.getIndex('index')
    this.MonthData[index].dutytypevalue='0'
  }
  closeDutyAmandpmMask(boolean){
    this.showAmAndPmMask=boolean;
    let index=this.storageService.getIndex('index');
    this.MonthData[index].dutytypevalue='0';
  }
  closeDutyAutoMask(boolean){
    this.showAutoDutyMask = boolean;
  }
  saveAddLeadersData(currentDateData){
    let index=this.storageService.getIndex('index');
    this.MonthData[index].currentMonthData.leaders=currentDateData.leaders;
    this.MonthData[index].currentMonthData.devisions=currentDateData.devisions;
    this.MonthData[index].currentMonthData.sections=currentDateData.sections;
    this.storageService.setCurrentMonthData('currentmonthdata',this.MonthData);
    console.log(this.MonthData)
  }
  saveAddPolicysData(currentDateData){
    let index=this.storageService.getIndex('index');
    this.MonthData[index].currentMonthData.policys.am=currentDateData.policyam;
    this.MonthData[index].currentMonthData.policys.pm=currentDateData.policypm;
    this.storageService.setCurrentMonthData('currentmonthdata',this.MonthData);
    console.log(this.MonthData)
  }
  submitAllMonthDate(){

    for(let i=0;i<this.MonthData.length;i++){
        if(this.MonthData[i].year==this.year&&this.MonthData[i].month==this.month){
         for(let j=0;j<this.MonthData[i].currentMonthData.devisions.length;j++){
           let def=this.MonthData[i].currentMonthData.devisions[j];
           this.submitMonthData.ScheduleUserVOs.push(
             {
               workUserId:def.workUserId,
               principalId:def.principalId,
               planDay:this.MonthData[i].year+'-'+this.MonthData[i].month+'-'+this.MonthData[i].showDate,
               planDayType:def.planDayType,
             }
           )
         }
        }
    }
    for(let i=0;i<this.MonthData.length;i++){
        if(this.MonthData[i].year==this.year&&this.MonthData[i].month==this.month){
          for(let j=0;j<this.MonthData[i].currentMonthData.sections.length;j++){
            let def=this.MonthData[i].currentMonthData.sections[j];
            this.submitMonthData.ScheduleUserVOs.push(
                {
                  workUserId:def.workUserId,
                  principalId:def.principalId,
                  planDay:this.MonthData[i].year+'-'+this.MonthData[i].month+'-'+this.MonthData[i].showDate,
                  planDayType:def.planDayType,
                }
            )
          }
        }
    }
    for(let i=0;i<this.MonthData.length;i++){
        if(this.MonthData[i].year==this.year&&this.MonthData[i].month==this.month){
          for(let j=0;j<this.MonthData[i].currentMonthData.leaders.length;j++){
            let def=this.MonthData[i].currentMonthData.leaders[j];
            this.submitMonthData.ScheduleUserVOs.push(
              {
                workUserId:def.workUserId,
                principalId:def.principalId,
                planDay:this.MonthData[i].year+'-'+this.MonthData[i].month+'-'+this.MonthData[i].showDate,
                planDayType:def.planDayType,
              }
            )
          }
        }
    }
    for(let i=0;i<this.MonthData.length;i++){
        if(this.MonthData[i].year==this.year&&this.MonthData[i].month==this.month){
          for(let j=0;j<this.MonthData[i].currentMonthData.policys.am.length;j++){
            let def=this.MonthData[i].currentMonthData.policys.am[j];
            this.submitMonthData.ScheduleUserVOs.push(
              {
                workUserId:def.workUserId,
                principalId:def.principalId,
                planDay:this.MonthData[i].year+'-'+this.MonthData[i].month+'-'+this.MonthData[i].showDate,
                planDayType:def.planDayType,
              }
            )
          }
        }
    }
    for(let i=0;i<this.MonthData.length;i++){
        if(this.MonthData[i].year==this.year&&this.MonthData[i].month==this.month){
          for(let j=0;j<this.MonthData[i].currentMonthData.policys.pm.length;j++){
            let def=this.MonthData[i].currentMonthData.policys.pm[j];
            this.submitMonthData.ScheduleUserVOs.push(
              {
                workUserId:def.workUserId,
                principalId:def.principalId,
                planDay:this.MonthData[i].year+'-'+this.MonthData[i].month+'-'+this.MonthData[i].showDate,
                planDayType:def.planDayType,
              }
            )
          }
        }
    }
    console.log(this.submitMonthData)

    this.dutyService.submitMonthDutyData(this.submitMonthData).subscribe(
      data=>{
      // this.hideSubmiting();
      // this.alert('提交成功');

    },(err:Error)=>{
      // this.alert(JSON.parse(JSON.stringify(err)).status);
    })
  }
  dutyAutoAddleaders(currentMonthData){
    this.MonthData=currentMonthData;
    this.storageService.setCurrentMonthData('currentmonthdata',this.MonthData);
    console.log(this.MonthData)
  }
  onDutyDateChange(dutyDate){
    this.dutyDate = dutyDate;
    this.year = this.dutyDate.getFullYear();
    this.month = this.dutyDate.getMonth() + 1;
    this.planTime = this.year + '-' + this.month;
    this.MonthData = this.getMonthData(this.year, this.month);
  }
  openDutyAutoMask(){
    this.showAutoDutyMask = true;
    this.storageService.setCurrentDate('date',this.month)
    this.storageService.setCurrentMonthData('currentmonthdata',this.MonthData)
  }
}
