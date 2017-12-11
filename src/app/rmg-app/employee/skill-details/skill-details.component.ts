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
  public editedSkillIndex: number;
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
      //  var arr =  this.skillList.sort((a, b)=>{
      //     let x = a[this.sortF].toLowerCase();
      //     let y = b[this.sortF].toLowerCase();
         
      //    if(event.order == - 1){
      //      if(x < y){
      //        return -1;
      //      }
      //    }
      //     if(event.order == 1){
      //       if(x > y){
      //       return 1;
      //       }
      //     }
      //     return x-y;

      //     // return 0
      //   });
      //   console.log(arr);
      //   console.log(this.skillList);
      //   this.skillList = this.skillList.slice();
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
        this.dataService.profilePercentage.emit(25);
      }
      this.skillList.push(Object.assign({}, this.skillModel));
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Skill added successfully!!' });
    } else {
      this.skillList[this.editedSkillIndex] = this.skillModel;
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

  onEdit(skill, index) {
    this.showButton = false;
    this.editedSkillIndex = index;
    this.skillModel = Object.assign({}, skill);
    this.onCategoryChange();
  }

  deleteSkill(index) {
    this.skillList.splice(index, 1);
    this.skillList=this.skillList.slice();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Skill deleted successfully!!' });
    if(this.skillList.length === 0){
        this.dataService.profilePercentage.emit(-25);
      }
  }
}
