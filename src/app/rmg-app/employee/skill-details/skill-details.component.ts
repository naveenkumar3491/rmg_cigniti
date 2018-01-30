import { Component, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../../services/DataService';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/primeng';
import { Ng2Storage } from "../../../services/storage";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-skill-details',
  templateUrl: './skill-details.component.html',
  styleUrls: ['./skill-details.component.scss']
})
export class SkillDetailsComponent implements OnChanges {
  @Input() skillDetails;
  @Input() skillMasterData;
  @Output() callBackProfessionalDetails = new EventEmitter();
  @Output() callBackContactDetails = new EventEmitter();
  public sortF: string;
   public skillHeader: any = [
    { field: 'skillCategory', header: 'Skill Category', width: '40%' },
    { field: 'skill', header: 'Skill', width: '40%' },
    { field: 'skillRating', header: 'Skill Rating', width: '12%' }
  ];
  public skillCategoriesList: any;
  public skillSet: any = [];
  public categoryList: any;
  public skillModel: any = {
    skillRating: 1
  };
  public skillList: any = [];
  public editedSkillObject: any;
  public showButton: boolean = true;
  public userData = this.storage.getSession('user_data');
  constructor(private dataService: DataService,
    private messageService: MessageService, private dPipe: DatePipe,
    private confirmationService: ConfirmationService, private storage: Ng2Storage) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.skillMasterData && changes.skillMasterData.currentValue) {
      this.categoryList = changes.skillMasterData.currentValue
    }
    if (changes.skillDetails && changes.skillDetails.currentValue) {
      this.skillList = changes.skillDetails.currentValue;
    }
  }
  changeSort(event) {
    if (event.order) {
      this.sortF = event.field;
    }
  }

  onCategoryChange(id) {
    this.dataService.getSkillsByCategory(id).subscribe((data) => {
      this.skillSet = data;
    })
  }

  saveSkill(type: string) {
    let progressValue = 0;
    //let paramObj = Object.assign({}, this.skillModel);
    let paramObj = {
      ...this.skillModel
    };
    paramObj.employeeId = this.userData.employeeId;
    paramObj.employeeName = this.userData.employeeName;

    if (this.skillList.length === 0) {
      progressValue = 20;
    }
    if (type !== 'add') {
      paramObj['rowid'] = this.editedSkillObject.skill_master_id;
    }
    this.dataService.addUpdateSkill(paramObj, progressValue, this.dPipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')).subscribe((data) => {
      if (type === 'add') {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Skill added successfully!!' });
      } else {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Skill updated successfully!!' });
      }
      this.showButton = true;
      this.skillModel = {
        skillRating: 1
      };
      this.skillSet = [];
      this.callBackProfessionalDetails.emit();
      this.callBackContactDetails.emit();
    });
    
  }

  onEdit(skill) {
    this.showButton = false;
    this.editedSkillObject = skill;
    const skillCatObj = this.categoryList.find((obj) => obj.label === skill.skillCategory);
    this.skillModel = {
      skillRating: skill.skillRating,
      skillCategoryId: skillCatObj.value
    }
    this.dataService.getSkillsByCategory(this.skillModel.skillCategoryId).subscribe((data) => {
      this.skillSet = data;
      const skillObj = this.skillSet.find((obj) => obj.label === skill.skill);
      this.skillModel.skillId = skillObj.value;
    })
  }

  onSkillFocus(sR) {
    setTimeout(() => {
      sR.el.nativeElement.querySelector('.ui-dropdown-items-wrapper').scrollTop = 0;
    }, 10);
  }

  deleteConfirm(skill, index) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete skill?',
      accept: () => {
        this.deleteSkill(skill, index);
      }
    });
  }

  deleteSkill(skill, index) {
    let progressBarValue = 0;
    if (this.skillList.length === 1) {
      progressBarValue = 20;
    }
    const skillObj = {
      rowid: skill.skill_master_id,
      employeeId: this.userData.employeeId,
      employeeName: this.userData.employeeName
    };
    this.dataService.deleteSkill(skillObj, progressBarValue, this.dPipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')).subscribe((data) => {
      this.callBackProfessionalDetails.emit();
      this.callBackContactDetails.emit();
      this.skillModel = {
        skillRating: 1
      };
      this.skillSet = [];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Skill deleted successfully!!' });
      this.showButton = true;
    });
  }

}
