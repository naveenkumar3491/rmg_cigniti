import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
   
    public changeIcon: boolean = true;
    private rowData: any = [];
    public dashboardData = {
        dashboardDetails: [
            {
                region: "NA-EAST",
                billing: 345,
                practice: 34,
                ats: 9,
                billingSum: 388,
                buffer: 34,
                blocked: 30,
                available: 2,
                deployable: 350,
                billingUtilzation: 84.5,
                training: 4,
                longleave: 4,
                onNotice: 5,
                coe: 0,
                innovation: 0,
                loa: 3,
                nbmanager: 7,
                buInfo: 3,
                totUtilzation: 80
            },
            {
                region: "NA-WEST",
                billing: 636,
                practice: 52,
                ats: 1,
                billingSum: 689,
                buffer: 20,
                blocked: 16,
                available: 15,
                deployable: 687,
                billingUtilzation: "92.6%",
                training: 0,
                longleave: 4,
                onNotice: 5,
                coe: 0,
                innovation: 0,
                loa: 3,
                nbmanager: 7,
                buInfo: 3,
                totUtilzation: "89.9%"
            },
            {
                region: "ROW",
                billing: 324,
                practice: 24,
                ats: 9,
                billingSum: 346,
                buffer: 34,
                blocked: 30,
                available: 2,
                deployable: 351,
                billingUtilzation: "92.3",
                training: 4,
                longleave: 4,
                onNotice: 5,
                coe: 0,
                innovation: 0,
                loa: 3,
                nbmanager: 7,
                buInfo: 3,
                totUtilzation: "91.4%"
            },
            {
                region: "ANZ",
                billing: 324,
                practice: 24,
                ats: 9,
                billingSum: 346,
                buffer: 34,
                blocked: 30,
                available: 2,
                deployable: 351,
                billingUtilzation: "92.3",
                training: 4,
                longleave: 4,
                onNotice: 5,
                coe: 0,
                innovation: 0,
                loa: 3,
                nbmanager: 7,
                buInfo: 3,
                totUtilzation: "91.4%"
            },
            {
                region: "APAC",
                billing: 324,
                practice: 24,
                ats: 9,
                billingSum: 346,
                buffer: 34,
                blocked: 30,
                available: 2,
                deployable: 351,
                billingUtilzation: "92.3",
                training: 4,
                longleave: 4,
                onNotice: 5,
                coe: 0,
                innovation: 0,
                loa: 3,
                nbmanager: 7,
                buInfo: 3,
                totUtilzation: "91.4%"
            },
            {
                region: "UKEU",
                billing: 324,
                practice: 24,
                ats: 9,
                billingSum: 346,
                buffer: 34,
                blocked: 30,
                available: 2,
                deployable: 351,
                billingUtilzation: "92.3",
                training: 4,
                longleave: 4,
                onNotice: 5,
                coe: 0,
                innovation: 0,
                loa: 3,
                nbmanager: 7,
                buInfo: 3,
                totUtilzation: "91.4%"
            },
            {
                region: "PRACTICE",
                billing: 0,
                practice: 0,
                ats: 0,
                billingSum: 0,
                buffer: 0,
                blocked: 2,
                available: 1,
                deployable: 13,
                billingUtilzation: "76.3%",
                training: 4,
                longleave: 4,
                onNotice: 5,
                coe: 0,
                innovation: 0,
                loa: 3,
                nbmanager: 7,
                buInfo: 3,
                totUtilzation: "91.4%"
            },
            {
                region: "ATS",
                billing: 0,
                practice: 0,
                ats: 0,
                billingSum: 0,
                buffer: 0,
                blocked: 2,
                available: 1,
                deployable: 13,
                billingUtilzation: "76.3%",
                training: 4,
                longleave: 4,
                onNotice: 5,
                coe: 0,
                innovation: 0,
                loa: 3,
                nbmanager: 7,
                buInfo: 3,
                totUtilzation: "91.4%"
            }],
        dashboardTotal: {
            regionTotal: "Total",
            billingTotal: 324,
            practiceTotal: 24,
            atsTotal: 9,
            billingSumTotal: 346,
            bufferTotal: 34,
            blockedTotal: 30,
            availableTotal: 2,
            deployableTotal: 351,
            billingUtilzationTotal: "92.3",
            trainingTotal: 4,
            longleaveTotal: 20,
            onNoticeTotal: 5,
            coeTotal: 0,
            innovationTotal: 0,
            loaTotal: 3,
            nbmanagerTotal: 7,
            buInfoTotal: 3,
            totUtilzationTotal: "91.4%"
        }
    };
    data: any;
    constructor() {

        this.data = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        '#FFC107',
                        '#03A9F4',
                        '#4CAF50'
                    ],
                    hoverBackgroundColor: [
                        '#FFE082',
                        '#81D4FA',
                        '#A5D6A7'
                    ]
                }]
        };
    }

    ngOnInit() {
        this.splitData();

    }

    splitData() {
        this.rowData = [];
        let rowChildrenRgns = ['ANZ', 'APAC', 'UKEU'];
        for (let i = 0; i < this.dashboardData.dashboardDetails.length; i++) {
            let obj = this.dashboardData.dashboardDetails[i];
            if (rowChildrenRgns.indexOf(obj.region) !== -1) {
                let ele = this.dashboardData.dashboardDetails.splice(i, 1);
                this.rowData = this.rowData.concat(ele);
                i = -1;
            }
        }
    }

    showRowData() {
        this.changeIcon = !this.changeIcon;
        this.dashboardData.dashboardDetails.splice(3, 0, ...this.rowData);
    }

    applyRowDataBg(index){
        if(this.dashboardData.dashboardDetails.length > 5){
            if(index === 3 || index === 4 || index ===5){
                return true;
            }else{
                return false;
            }
        }
    }

}
