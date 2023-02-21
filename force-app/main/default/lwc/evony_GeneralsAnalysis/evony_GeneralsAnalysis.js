import { LightningElement, track, wire } from 'lwc';
import { skillsAttributeFields, generalAnalysisDataTableColumns } from './evony_GeneralsAnalysisHelper';
import getGenerals from '@salesforce/apex/Evony_GeneralService.getAllGenerals';
import getGeneralSpecialtySkills from '@salesforce/apex/Evony_GeneralSpecialtySkillSelector.getAllGeneralSpecialtySkillByGeneralsId';

export default class Evony_GeneralsAnalysis extends LightningElement {
    @track generalsById;
    @track checkBoxOptions;
    @track checkBoxSelectedValues = [];

    @track dataTableInformation;
    dataTableColumns = generalAnalysisDataTableColumns();

    specialtySkillByGeneralId;
    generalSummaryByGeneralId = new Map();

    renderCallBack() {}

    connectedCallback() {}

    @wire(getGenerals, {})
    getGenralFunction({error, data}) {
        if(data) {
            let options = [];
            let generalMap = new Map();

            for(let key in data) {
                generalMap.set(data[key].Id, data[key]);
                options.push({label: data[key].Name, value: data[key].Id});
            }
            this.generalsById = generalMap;
            this.checkBoxOptions = options;
            this.getGeneralSpecialtySkills();
        } else if(error) {
            console.error('An error has happened', error);
        }
    }

    handleChange(event) {
        this.checkBoxSelectedValues = [];
        event.detail.value.forEach(element => this.checkBoxSelectedValues.push(element));

        if(this.checkBoxSelectedValues.length > 0) {
            this.updateTableContent();
        }
    }

    generatesGeneralAnalysis() {
        this.getGeneralSpecialtySkills();
        //this.calculateGeneralSummary();
    }

    getGeneralSpecialtySkills() {
        getGeneralSpecialtySkills({generalsId: Array.from(this.generalsById.keys())})
            .then(result => {
                let specialtySkillByGeneralId = new Map();

                result.forEach(element => {
                    let skillList = specialtySkillByGeneralId.get(element.General__c);

                    if(typeof skillList == 'undefined') {
                        skillList = [];
                    }
                    skillList.push(element);
                    specialtySkillByGeneralId.set(element.General__c, skillList);
                });
                this.specialtySkillByGeneralId = specialtySkillByGeneralId;
                
                // Summarize Generals Skills
                this.calculateGeneralSummary();
            })
            .catch(error=> {
                console.error('An error has happened', error);
            });
    }

    calculateGeneralSummary() {
        // Iterate through Skill Fields
        skillsAttributeFields().forEach(skillField => {

            // Iterate over generals list
            for(let generalId of this.generalsById.keys()) {
                let general = this.generalsById.get(generalId);
                let generalSummary = this.generalSummaryByGeneralId.get(generalId);
                
                if(typeof generalSummary == 'undefined') {
                    generalSummary = {Id: general.Id, Name: general.Name};
                }

                if(typeof generalSummary[skillField] == 'undefined') {
                    generalSummary[skillField] = 0.00;
                }

                if(typeof general[skillField] != 'undefined') {
                    generalSummary[skillField] += general[skillField];
                }

                // Iterate over specialty skills
                if(typeof this.specialtySkillByGeneralId.get(generalId) != 'undefined') {
                    for(let specialtySkillList of this.specialtySkillByGeneralId.get(generalId)) {
                        if(typeof specialtySkillList[skillField] != 'undefined') {
                            generalSummary[skillField] += specialtySkillList[skillField];
                        }
                    }
                }
                this.generalSummaryByGeneralId.set(generalSummary.Id, generalSummary);
            }
        });
    }

    updateTableContent() {
        let data = [];

        this.checkBoxSelectedValues.forEach(generalId => {
            let generalSummary = this.generalSummaryByGeneralId.get(generalId);
            let dataRecordObejct = { generalName: generalSummary.Name };

            skillsAttributeFields().forEach(
                skillField => dataRecordObejct[skillField] = generalSummary[skillField]
            );
            
            data.push(dataRecordObejct);
        });
        this.dataTableInformation = data;
    }
}