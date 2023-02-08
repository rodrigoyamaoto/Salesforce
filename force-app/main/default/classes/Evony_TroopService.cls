public without sharing class Evony_TroopService {

    private static final Evony_TroopSelector selector = new Evony_TroopSelector();

    public Evony_TroopService() {

    }

    @AuraEnabled(cacheable = true)
    public static List<Evony_Troop__c> getAllTroops() {
        return (List<Evony_Troop__c>) selector.selectAll();
    }
}