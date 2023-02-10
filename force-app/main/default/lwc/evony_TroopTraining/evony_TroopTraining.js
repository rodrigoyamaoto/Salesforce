import { LightningElement, track, wire, api } from 'lwc';
import getTroopList from '@salesforce/apex/Evony_TroopService.getAllTroops';

const dataTableColumns = [
    {label: 'Troop', fieldName: 'troopName'},
    {label: 'Total Ore', fieldName: 'totalOre', type: 'number'},
    {label: 'Total Food', fieldName: 'totalFood', type: 'number'},
    {label: 'Total Stone', fieldName: 'totalStone', type: 'number'},
    {label: 'Total Lumber', fieldName: 'totalLumber', type: 'number'},
    {label: 'Total Recruit Time', fieldName: 'totalRecruitTime', type: 'string', cellAttributes: {alignment: 'right'}}
];

export default class Evony_TroopTraining extends LightningElement {
    // Troops Variables
    @track troopByTroopName;
    @track troopTypeOptions;
    @track troopTypeSelected;
    @track troopQuantityToRecruit;

    // Data table variables
    @track dataTableInformation;
    dataTableColumns = dataTableColumns;

    @wire(getTroopList, {})
    getTroopListFunction({error, data}) {
        if(data) {
            let options = [];
            let troopMap = new Map();

            for(let key in data) {
                troopMap.set(data[key].TroopName__c, data[key]);
                options.push({value: data[key].TroopName__c, label: data[key].TroopName__c});
            }
            this.troopByTroopName = troopMap;
            this.troopTypeOptions = options;
        } else if (error) {
            console.error('An error has happened', error);
        }
    }

    clear() {
        this.dataTableInformation = [];
    }

    handleChange(event) {
        this.clear();
        this.troopTypeSelected = event.detail.value;

        if(this.troopQuantityToRecruit != null) {
            this.calculateResources();
        }
    }

    troopQuantityInputBlur(event) {
        this.troopQuantityToRecruit = event.target.value;
    }

    calculateResources() {
        let data = [];
        let troop = this.troopByTroopName.get(this.troopTypeSelected);

        // Update the dataTable records
        data.push({
            troopName: troop.TroopName__c,
            totalOre: troop.OreCost__c * this.troopQuantityToRecruit,
            totalFood: troop.FoodCost__c * this.troopQuantityToRecruit,
            totalStone: troop.StoneCost__c * this.troopQuantityToRecruit,
            totalLumber: troop.LumberCost__c * this.troopQuantityToRecruit,
            totalRecruitTime: this.calculateRecruitTime(troop)
        });
            
        this.dataTableInformation = data;
    }

    calculateRecruitTime(troop) {
        let response = '';
        let dateVar = new Date(1900, 0, 1);
        let dateAux = new Date(dateVar);
        let totalMilliseconds = troop.RecruitTime__c * this.troopQuantityToRecruit;

        // Increment to the date the total recruit time
        dateVar.setHours(0, 0, 0, totalMilliseconds);

        // If the recruit time has more then 24 need to update the day
        let diffDays = dateVar.getDay() - dateAux.getDay();
        let diffMonths = dateVar.getMonth() - dateAux.getMonth();

        if(diffMonths > 0) {
            response = diffMonths + ' Month'
        }

        if(diffDays > 0) {
            response.concat(' ', diffDays + ' Days');
        }

        let responseTime = 
            ('0' + dateVar.getHours()).slice(-2) + ':' +
            ('0' + dateVar.getMinutes()).slice(-2) + ':' +
            ('0' + dateVar.getSeconds()).slice(-2)

        return response.concat(' ', responseTime);
    }
}