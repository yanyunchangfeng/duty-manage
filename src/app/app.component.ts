import { Component, OnInit } from '@angular/core';
import { DialogService } from 'yycf-dialog/components'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'duty-manage';
  constructor(public dialog: DialogService) {

  }
  ngOnInit() {
    this.dialog.confirm(
      {
        message: '正在拼命加载...',
        header: 'waiting',
        okVisible: false,
        offVisible: false,
        okButton: 'blue',
        offButton: 'green',
        okLabel: ``,
        key: "1",
        offLabel: ``,
        delay: 2000
      })
  }
}


