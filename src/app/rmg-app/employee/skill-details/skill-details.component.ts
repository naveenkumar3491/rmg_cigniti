import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../../services/DataService";
import { MessageService } from "primeng/components/common/messageservice";
import { ConfirmationService } from "primeng/primeng";

@Component({
  selector: 'val-skill-details',
  templateUrl: './skill-details.component.html',
  styleUrls: ['./skill-details.component.scss']
})
export class SkillDetailsComponent implements OnInit {
  @Input() skillDetails;
  @Input() skillMasterData;
  public sortF: string;
  public skillHeader:any = [
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
  constructor(private dataService: DataService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    console.log('init');
  }

  ngOnChanges() {
    this.skillList = this.skillDetails;
    this.categoryList = this.skillMasterData.categoryList;
    this.skillCategoriesList = this.skillMasterData.skillCategoriesList;
    console.log(this.categoryList);
  }
  
  changeSort(event) {
        if (event.order) {
          this.sortF = event.field;
        }
    }

  onCategoryChange() {
    let _this = this;
    let foundCategory = this.categoryList.find((obj) => {
      return obj.category === _this.skillModel.skillCategory;
    })
    if (foundCategory) {
      this.skillSet = foundCategory.skillSet;
    }
  }

  saveSkill(type: string) {
    if (type === 'add') {
      if(this.skillList.length === 0){
        this.dataService.profilePercentage.emit(20);
      }
      console.log(this.skillModel);
      // this.dataService.saveSkill().subscribe((data) => {

      // });
      this.skillList.unshift(Object.assign({}, this.skillModel));
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Skill added successfully!!' });
    } else {
      this.skillList.forEach((skill, index) => {
        if(skill.skill_master_id === this.editedSkillObject.skill_master_id){
          this.skillList[index] = this.skillModel;
        }
      });
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Skill updated successfully!!' });
    }
    this.skillList=this.skillList.slice();
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

  onSkillFocus(sR){
    setTimeout(() => {
      sR.el.nativeElement.querySelector('.ui-dropdown-items-wrapper').scrollTop = 0;
    }, 10)
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
    this.skillList=this.skillList.slice();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Skill deleted successfully!!' });
    if(this.skillList.length === 0){
        this.dataService.profilePercentage.emit(20);
      }
  }
}
