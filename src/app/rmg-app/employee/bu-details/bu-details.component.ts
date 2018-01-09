import { Component, OnInit, Input } from '@angular/core';
import { Ng2Storage } from "../../../services/storage";

@Component({
  selector: 'app-bu-details',
  templateUrl: './bu-details.component.html',
  styleUrls: ['./bu-details.component.scss']
})
export class BUDetailsComponent implements OnInit {
  @Input() personalDetails;
  @Input() buMasterData;
  @Input() duMasterData;
  public editMode: boolean = false;
  public buModel: any = {};
   public userData = this.storage.getSession('user_data');
  constructor(private storage: Ng2Storage) { }

  ngOnInit() {
  }

  onBuEdit() {
    this.editMode = true;
    const pd = this.personalDetails;
    this.buModel = {
      accountManager: pd.accountManager,
      projectManager: pd.project_manager,
      hrSpoc: pd.hrSpoc,
      buHead: pd.buHead,
      duHead: pd.duHead,
      bu: pd.bu,
      du: pd.du
    };
  }

}
