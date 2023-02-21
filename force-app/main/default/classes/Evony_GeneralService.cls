public without sharing class Evony_GeneralService {

    private static final Evony_GeneralSelector selector = new Evony_GeneralSelector();

    public Evony_GeneralService() {}

    @AuraEnabled(cacheable = true)
    public static List<Evony_General__c> getAllGenerals() {
        return (List<Evony_General__c>) selector.selectAll('Name');
    }
}