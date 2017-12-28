import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bu-details',
  templateUrl: './bu-details.component.html',
  styleUrls: ['./bu-details.component.scss']
})
export class BUDetailsComponent implements OnInit {
  @Input() personalDetails;
  public editMode: boolean = false;
  public buModel: any = {};
  constructor() { }

  ngOnInit() {
  }

  onBuEdit() {
    this.editMode = true;
    const pd = this.personalDetails;
    this.buModel = {
      accountManager: pd.accountManager,
      hrSpoc: pd.hrSpoc,
      buHead: pd.buHead,
      duHead: pd.duHead,
      bu: pd.bu,
      du: pd.du
    };
  }

}
