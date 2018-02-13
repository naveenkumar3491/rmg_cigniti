import { Component, Input, OnChanges, ViewChild, ElementRef, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Ng2Storage } from "../../../services/storage";
import { MessageService } from 'primeng/components/common/messageservice';
import { DateFormatPipe } from "../../../common/pipes/dateFormat.pipe";
import { DataService } from "../../../services/DataService";

@Component({
    selector: 'app-passport-details',
    templateUrl: './passport-details.component.html',
    styleUrls: ['./passport-details.component.scss']
})
export class PassportDetailsComponent implements OnChanges {
    @Input() personalDetails;
    @Output() callBackContactDetails = new EventEmitter();
    @ViewChild('getFile') fileInput: ElementRef;
    @ViewChild('op1') overlay;
    public passportDetails: any[] = [];
    public passportModel: any = {};
    public scanCopyUrl: any;
    public active: boolean = true;
    public minPassportDate: any;
    public editMode: boolean = false;
    public dateOfIssue: any;
    public dateOfExpiry: any;
    public userData = this.storage.getSession('user_data');
    constructor(private storage: Ng2Storage, private messageService: MessageService,
        private datePipe: DateFormatPipe, private dataService: DataService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.personalDetails && changes.personalDetails.currentValue) {
            this.onLoad();
        }
    }

    onLoad() {
        this.scanCopyUrl = this.personalDetails.passposrt_Scan ? `data:image/png;base64,${this.personalDetails.passposrt_Scan}` : null;
        let splitIssueDate = this.personalDetails.passport_Valid_From.split('-');
        let splitExpiryDate = this.personalDetails.passport_Valid_To.split('-');
        this.dateOfIssue = new Date([splitIssueDate[1], splitIssueDate[0], splitIssueDate[2]].join('-'));
        this.dateOfExpiry = new Date([splitExpiryDate[1], splitExpiryDate[0], splitExpiryDate[2]].join('-'));
    }

    onAddPassport(type) {
        if (!this.scanCopyUrl) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please attach passport scan copy.' });
            return;
        }
        const input = new FormData();
        const fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            const fileToUpload = fi.files[0];
            input.append('passposrt_Scan', fileToUpload);
        }
        input.append('emp_id', this.userData.employeeId);
        input.append('passport_no', this.passportModel.passportNumber);
        input.append('passport_Valid_From', this.datePipe.transform(this.passportModel.validFrom, 'dd-MM-yyyy'));
        input.append('passport_Valid_To', this.datePipe.transform(this.passportModel.validTo, 'dd-MM-yyyy'));
        input.append('passport_Issue_Date', this.datePipe.transform(this.passportModel.issueDate, 'dd-MM-yyyy'));
        this.dataService.addUpdatePassport(input).subscribe(data => {
            this.callBackContactDetails.emit();
            this.editMode = false;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Passport Saved Successfully!!' });
        });
    }

    onPassportEdit() {
        this.editMode = true;
        const pd = this.personalDetails;
        this.passportModel = {
            passportNumber: pd.passport_no,
            validFrom: pd.passport_Valid_From,
            validTo: pd.passport_Valid_To
        }

    }

    onPassportCancel() {
        this.editMode = false;
        this.onLoad();
    }

    onPassportValidFrom() {
        this.passportModel.validTo = null;
        this.minPassportDate = this.passportModel.validFrom;
        this.active = false;
        setTimeout(() => { this.active = true; }, 0);
    }

    readScanCopy(event: any) {
        let maxImgLSize = 102400;
        if (event.target.files && event.target.files[0]) {
            if (event.target.files[0].size > maxImgLSize) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Selected scan copy is more than 100KB' });
            } else {
                var reader = new FileReader();
                reader.onload = (event: any) => {
                    this.scanCopyUrl = event.target.result;
                }
                reader.readAsDataURL(event.target.files[0]);
            }
        }
    }

    disableBtn() {
        const modelArray = ['passportNumber', 'validFrom', 'validTo'];
        let isValid = false;
        modelArray.forEach((obj) => {
            if (!this.passportModel[obj]) {
                isValid = true;
            }
        });
        return isValid;
    }
}