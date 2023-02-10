import { LightningElement, track, wire, api } from 'lwc';
import getAccountList from '@salesforce/apex/Evony_AccountService.getAllAccounts';

const accountDataTableColumns = [
    {label: 'Name', fieldName: 'Name'},
    {label: 'Total Ore', fieldName: 'TotalOre__c', type: 'number'},
    {label: 'Total Food', fieldName: 'TotalFood__c', type: 'number'},
    {label: 'Total Stone', fieldName: 'TotalStone__c', type: 'number'},
    {label: 'Total Lumber', fieldName: 'TotalLumber__c', type: 'number'}
];

const aggregateDataTableColumns = [
    {label: 'Total Unified Ore', fieldName: 'TotalUnifiedOre', type: 'number'},
    {label: 'Total Unified Food', fieldName: 'TotalUnifiedFood', type: 'number'},
    {label: 'Total Unified Stone', fieldName: 'TotalUnifiedStone', type: 'number'},
    {label: 'Total Unified Lumber', fieldName: 'TotalUnifiedLumber', type: 'number'}
];

export default class Evony_AccountResourceVisualization extends LightningElement {
    // Account Variables
    @track accountByName;

    // Data table variables
    @track accountDataTableInformation;
    accountDataTableColumns = accountDataTableColumns;

    @wire(getAccountList, {})
    getAccountListFunction({error, data}) {
        if(data) {
            let accountTable = [];
            let accountMap = new Map();

            for(let key in data) {
                accountMap.set(data[key].Name, data[key]);
                
                accountTable.push({
                    Name: data[key].Name,
                    TotalOre__c: data[key].TotalOre__c,
                    TotalFood__c: data[key].TotalFood__c,
                    TotalStone__c: data[key].TotalStone__c,
                    TotalLumber__c: data[key].TotalLumber__c
                });
            }
            this.accountByName = accountMap;
            this.accountDataTableInformation = accountTable;
        } else if (error) {
            console.error('An error has happened', error);
        }
    }
}