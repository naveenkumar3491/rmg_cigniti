import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../../services/DataService";
import { MessageService } from "primeng/components/common/messageservice";

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
  constructor(private dataService: DataService, private messageService: MessageService) { }

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
        // this.skillList.sort((a,b) => {
        //     var x = a[this.sortF].toLowerCase(), y = b[this.sortF].toLowerCase();
        //     if(event.order == 1){
        //         if ( x < y )
        //             return -1;
        //         if ( x > b )
        //             return 1;
        //         return 0;
        //     }else{
        //         if ( x < y )
        //             return 1;
        //         if ( x > b )
        //             return -1;
        //         return 0;
        //     }

        // });
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

  deleteSkill(index) {
    this.skillList.splice(index, 1);
    this.skillList=this.skillList.slice();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Skill deleted successfully!!' });
    if(this.skillList.length === 0){
        this.dataService.profilePercentage.emit(20);
      }
  }
}
