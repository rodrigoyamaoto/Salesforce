import { LightningElement, track, wire, api } from 'lwc';
import getTroopList from '@salesforce/apex/Evony_TroopService.getAllTroops';

const dataTableColumns = [
    {label: 'Troop', fieldName: 'troopName'},
    {label: 'Total Ore', fieldName: 'totalOre', type: 'number'},
    {label: 'Total Food', fieldName: 'totalFood', type: 'number'},
    {label: 'Total Stone', fieldName: 'totalStone', type: 'number'},
    {label: 'Total Lumber', fieldName: 'totalLumber', type: 'number'}
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

    handleChange(event) {
        this.troopTypeSelected = event.detail.value;
    }

    troopQuantityInputBlur(event) {
        this.troopQuantityToRecruit = event.target.value;
    }

    calculateResources() {
        let data = [];
        let troop = this.troopByTroopName.get(this.troopTypeSelected);
        
        data.push({
            troopName: troop.TroopName__c,
            totalOre: troop.OreCost__c * this.troopQuantityToRecruit,
            totalFood: troop.FoodCost__c * this.troopQuantityToRecruit,
            totalStone: troop.StoneCost__c * this.troopQuantityToRecruit,
            totalLumber: troop.LumberCost__c * this.troopQuantityToRecruit
        });
            
        this.dataTableInformation = data;
        console.log('data = ' + data);
        console.log('dataTableInformation = ' + this.dataTableInformation);
    }
}