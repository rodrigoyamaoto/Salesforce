public without sharing class Evony_AccountService {

    private static final Evony_AccountSelector selector = new Evony_AccountSelector();

    public Evony_AccountService() {}

    @AuraEnabled(cacheable = true)
    public static List<Evony_Account__c> getAllAccounts() {
        return (List<Evony_Account__c>) selector.selectAll();
    }
}