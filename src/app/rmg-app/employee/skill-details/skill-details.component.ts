import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { DataService } from '../../../services/DataService';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/primeng';
import { Ng2Storage } from "../../../services/storage";

@Component({
  selector: 'app-skill-details',
  templateUrl: './skill-details.component.html',
  styleUrls: ['./skill-details.component.scss']
})
export class SkillDetailsComponent implements OnChanges {
  @Input() skillDetails;
  @Input() skillMasterData;
  public sortF: string;
  public skillHeader: any = [
      {field: 'skillCategory', header: 'Skill Category'},
      {field: 'skill', header: 'Skill'},
      {field: 'skillRating', header: 'Skill Rating'}
  ];
  public skillCategoriesList: any;
  public skillSet: any = [];
  public categoryList: any;
  public skillModel: any = {
    skillCategory: '',
    skill: '',
    skillRating: 1
  };
  public skillList: any = [];
  public editedSkillObject: any;
  public showButton: boolean = true;
  public userData = this.storage.getSession('user_data');
  constructor(private dataService: DataService, 
  private messageService: MessageService, 
  private confirmationService: ConfirmationService, private storage: Ng2Storage) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.skillMasterData && changes.skillMasterData.currentValue) {
      this.categoryList = changes.skillMasterData.currentValue.categoryList;
    this.skillCategoriesList = changes.skillMasterData.currentValue.skillCategoriesList;
    }
    if (changes.skillDetails && changes.skillDetails.currentValue) {
       this.skillList = this.skillDetails.currentValue;
    }
  }
  changeSort(event) {
        if (event.order) {
          this.sortF = event.field;
        }
    }

  onCategoryChange() {
    const _this = this;
    const foundCategory = this.categoryList.find((obj) => {
      return obj.category === _this.skillModel.skillCategory;
    });
    if (foundCategory) {
      this.skillSet = foundCategory.skillSet;
    }
  }

  saveSkill(type: string) {
    if (type === 'add') {
      if (this.skillList.length === 0) {
        this.dataService.profilePercentage.emit(20);
      }
      console.log(this.skillModel);
      // this.dataService.saveSkill().subscribe((data) => {

      // });
      this.skillList.unshift(Object.assign({}, this.skillModel));
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Skill added successfully!!' });
    } else {
      this.skillList.forEach((skill, index) => {
        if (skill.skill_master_id === this.editedSkillObject.skill_master_id) {
          this.skillList[index] = this.skillModel;
        }
      });
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Skill updated successfully!!' });
    }
    this.skillList = this.skillList.slice();
    this.showButton = true;
    this.skillModel = {
      skillCategory: '',
      skill: '',
      skillRating: 1
    };
  }

  onEdit(skill) {
    this.showButton = false;
    this.editedSkillObject = skill;
    this.skillModel = Object.assign({}, skill);
    this.onCategoryChange();
  }

  onSkillFocus(sR) {
    setTimeout(() => {
      sR.el.nativeElement.querySelector('.ui-dropdown-items-wrapper').scrollTop = 0;
    }, 10);
  }

  deleteConfirm(index) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete skill?',
      accept: () => {
        this.deleteSkill(index);
      }
    });
  }

  deleteSkill(index) {
    this.skillList.splice(index, 1);
    this.skillList = this.skillList.slice();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Skill deleted successfully!!' });
    if (this.skillList.length === 0) {
        this.dataService.profilePercentage.emit(-20);
      }
  }
}
