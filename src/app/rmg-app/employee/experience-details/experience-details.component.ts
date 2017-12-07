import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'val-experience-details',
  templateUrl: './experience-details.component.html',
  styleUrls: ['./experience-details.component.scss']
})
export class ExperienceDetailsComponent implements OnInit {
  public resumeName;
  public emptyResume: boolean;
  public editMode: boolean = true;
  public exp = {
    years: 1,
    months: 1
  }
  @Input() personalDetails;
  @ViewChild('getResumeFile') resumeInput: ElementRef;
  constructor() { }

  ngOnInit() {
    this.resumeName = "Not Yet Upload";
    this.emptyResume = true;
    this.personalDetails.totalExperience = '4 years 6 months'
    if (!this.personalDetails.totalExperience) {
      this.editMode = false;
    }
  }

  readResume(event: any) {

    if (event.target.files && event.target.files[0]) {
      this.resumeName = event.target.files[0].name;
      this.emptyResume = false;
    }
  }
  removeResume() {
    this.emptyResume = true;
    this.resumeName = "Not Yet Upload"
  }

  saveExp(type) {
    if (type === 'save') {
      this.editMode = true;
      this.personalDetails.totalExperience = `${this.exp.years} years ${this.exp.months} months`;
    }else{
      this.editMode = false;
      let expSplit = this.personalDetails.totalExperience.split(' ');
      this.exp.years = expSplit[0];
      this.exp.months = expSplit[2]
    }
  }

}
