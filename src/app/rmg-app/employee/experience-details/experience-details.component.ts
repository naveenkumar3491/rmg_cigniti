import { Component, OnInit, ViewChild, ElementRef,Input } from '@angular/core';

@Component({
  selector: 'val-experience-details',
  templateUrl: './experience-details.component.html',
  styleUrls: ['./experience-details.component.scss']
})
export class ExperienceDetailsComponent implements OnInit {
  public resumeName;
  public emptyResume: boolean;
  @Input() personalDetails;
  @ViewChild('getResumeFile') resumeInput: ElementRef;
  constructor() { }

  ngOnInit() {
    this.resumeName = "Not Yet Upload";
     this.emptyResume = true;
     console.log(this.personalDetails)
  }

  readResume(event: any) {

		if (event.target.files && event.target.files[0]) {
		  this.resumeName = event.target.files[0].name;
		  this.emptyResume = false;
		}
	  }
	  removeResume() {
		this.emptyResume = true;
		this.resumeName ="Not Yet Upload"
	  }

}
