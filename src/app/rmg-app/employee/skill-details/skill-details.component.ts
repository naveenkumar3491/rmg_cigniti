import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../../services/DataService";

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
  constructor(private dataService: DataService) { }

  ngOnInit() {
    console.log('init');
  }

  ngOnChanges() {
    console.log(this.skillDetails);
    console.log(this.skillMasterData);
    this.skillList = this.skillDetails;
    this.categoryList = this.skillMasterData.categoryList;
    this.skillCategoriesList = this.skillMasterData.skillCategoriesList;
  }

  changeSort(event) {
        if (event.order) {
          this.sortF = event.field;
        }
        console.log(this.sortF);
         console.log(event.order);
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

  saveSkill(type: string, form) {
    if (type === 'add') {
      if(this.skillList.length === 0){
        this.dataService.profilePercentage.emit(25);
      }
      this.skillList.push(Object.assign({}, this.skillModel));
    } else {
      this.skillList[this.editedSkillIndex] = this.skillModel;
    }
    this.skillList=this.skillList.slice();
    this.showButton = true;
    this.skillModel = {
      skillCategory: '',
      skill: '',
      skillRating: 1
    };
  }

  editSkill(skill, index) {
    this.showButton = false;
    this.editedSkillIndex = index;
    this.skillModel = Object.assign({}, skill);
    this.onCategoryChange();
  }

  deleteSkill(index) {
    this.skillList.splice(index, 1);
    this.skillList=this.skillList.slice();
    if(this.skillList.length === 0){
        this.dataService.profilePercentage.emit(-25);
      }
  }
}
