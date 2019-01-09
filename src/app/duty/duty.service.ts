import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class DutyService {
  text: any = {
    months: [
      "01-",
      "02-",
      "03-",
      "04-",
      "05-",
      "06-",
      "07-",
      "08-",
      "09-",
      "10-",
      "11-",
      "12-"
    ],
    monthsShort: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月"
    ]
  };
  constructor(public http: HttpClient) {}
  getFormat(date) {
    if (!date) {
      return "";
    }
    date = new Date(date);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let second = date.getSeconds();
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    hour = hour < 10 ? "0" + hour : hour;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    second = second < 10 ? "0" + second : second;
    return month + "-" + year;
  }
  createReqObject(data) {
    return JSON.stringify(data);
  }
  getOptions() {
    // let headers=new Headers();
    // headers.set('Content-Type', 'application/x-www-form-urlencoded');
    // let options=new RequestOptions({headers:headers})
    // return options
  }
  //测试代码
  getScheduleUserForDevisionChief(user): Observable<any> {
    return this.http
      .get(
        `/HEB_STCS_REST/ScheduleManage/getScheduleManageUserByType.action?principalId=${
          user.principalId
        }&userId=${user.userId}`
      )
      .pipe(
        map((res: Response) => {
          let body = res.json();
          console.log(body);
          return body;
        })
      );
  }
  getScheduleUserForSectionChief(user): Observable<any> {
    return this.http
      .get(
        `/HEB_STCS_REST/ScheduleManage/getScheduleManageUserByType.action?principalId=${
          user.principalId
        }&userId=${user.userId}`
      )
      .pipe(
        map((res: Response) => {
          // let body = res.json();
          // console.log(body);
          return res;
        })
      );
  }
  getScheduleUserForPolicy(user): Observable<any> {
    return this.http
      .get(
        `/HEB_STCS_REST/ScheduleManage/getScheduleManageUserByType.action?principalId=${
          user.principalId
        }&userId=${user.userId}`
      )
      .pipe(
        map((res: Response) => {
          // let body = res.json();
          // console.log(body);
          return res;
        })
      );
  }
  getScheduleUserForLeader(user): Observable<any> {
    return this.http
      .get(
        `/HEB_STCS_REST/ScheduleManage/getScheduleManageUserByType.action?principalId=${
          user.principalId
        }&userId=${user.userId}`
      )
      .pipe(
        map((res: Response) => {
          // let body = res.json();
          // console.log(body);
          return res;
        })
      );
  }
  getOrg(user): Observable<any> {
    return this.http
      .get(`/HEB_STCS_REST/ScheduleManage/getOrg.action?userId=${user.userId}`)
      .pipe(
        map((res: Response) => {
          // let body = res.json();
          // console.log(body);
          return res;
        })
      );
  }
  submitMonthDutyData(obj): Observable<any> {
    return this.http
      .post(
        `/HEB_STCS_REST/ScheduleManage/addOrUpdatePlanUser.action`,
        this.createReqObject(obj),
        // this.getOptions()
      )
      .pipe(
        map((res: Response) => {
          // let body = res.json();
          // console.log(body);
          return res;
        })
      );
  }
  getScheduleUserForOrg(user): Observable<any> {
    return this.http
      .get(
        `/HEB_STCS_REST/ScheduleManage/getScheduleManageUserByType.action?principalId=${
          user.principalId
        }&userId=${user.userId}&orgId=${user.orgId}`
      )
      .pipe(
        map((res: Response) => {
          // let body = res.json();
          return res;
        })
      );
  }
  getPlanDuty(user): Observable<any> {
    return this.http
      .get(
        `/HEB_STCS_REST/ScheduleManage/getPlan.action?userId=${
          user.userId
        }&planTime=${user.planTime}&gpsPlanType=${user.gpsPlanType}`
      )
      .pipe(
        map((res: Response) => {
          // let body = res.json();
          return res;
        })
      );
  }
  getCurrentLoginUserName(user) {
    return this.http
      .get(`/HEB_STCS_REST/duty/getUserName.action?userId=${user.userId}`)
      .pipe(
        map((res: Response) => {
          // let body = res.json();
          return res;
        })
      );
  }
  getSchedulePerson(){
    return this.http.get('assets/data.json')
  }
}
