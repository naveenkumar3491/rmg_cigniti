import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'val-skill-details',
  templateUrl: './skill-details.component.html',
  styleUrls: ['./skill-details.component.scss']
})
export class SkillDetailsComponent implements OnInit {
  @Input() skillDetails;
  public sortF: string = 'skillCategory';
  public skillHeader:any = [
      {field: 'skillCategory', header: 'Skill Category'},
      {field: 'skill', header: 'Skill'},
      {field: 'skillRating', header: 'Skill Rating'}
  ];
  public skillCategoriesList: any = [
    { label: 'Automation Testing', value: 'Automation Testing' },
    { label: 'Performance Testing', value: 'Performance Testing' },
    { label: 'Security Testing', value: 'Security Testing' },
    { label: 'Manual Testing', value: 'Manual Testing' },
    { label: 'SME', value: 'SME' },
    { label: 'Developer', value: 'Developer' }
  ];
  public skillSet: any = [];
  public categoryList: any = [
    { category: 'Automation Testing', skillSet: [{ label: 'testing1', value: 'testing1' }] },
    { category: 'Performance Testing', skillSet: [{ label: 'performance', value: 'performance' }] },
    { category: 'Security Testing', skillSet: [{ label: 'security', value: 'security' }] },
    { category: 'Manual Testing', skillSet: [{ label: 'manual', value: 'manual' }] },
    { category: 'SME', skillSet: [{ label: 'sme', value: 'sme' }] },
    { category: 'Developer', skillSet: [{ label: 'Java', value: 'Java' }] }
  ];
  public skillModel: any = {
    skillCategory: '',
    skill: '',
    skillRating: 1
  };
  public skillList: any = [];
  public editedSkillIndex: number;
  public showButton: boolean = true;
  constructor() { }

  ngOnInit() {
    console.log('init');
  }

  ngOnChanges() {
    console.log(this.skillDetails)
    this.skillList = this.skillDetails;
  }

  changeSort(event) {
        if (!event.order) {
          this.sortF = 'year';
        } else {
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

  saveSkill(type: string, form) {
    if (type === 'add') {
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
  }
}
