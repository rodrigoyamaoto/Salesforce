public class Evony_GeneralSpecialtySkillSelector extends Selector {

    private static final Evony_GeneralSpecialtySkillSelector selector = new Evony_GeneralSpecialtySkillSelector();
    
    public Evony_GeneralSpecialtySkillSelector() {
        super('Evony_GeneralSpecialtySkills__c');
    }

    @AuraEnabled(cacheable = true)
    public static List<Evony_GeneralSpecialtySkills__c> getAllGeneralSpecialtySkillByGeneralsId(List<String> generalsId) {
        Evony_SpecialtySkillSelector specialtySkillSelector = new Evony_SpecialtySkillSelector();

        System.debug('generalsId = ' + generalsId);

        // Create string to use to get all fields from Evony_SpecialtySkill__c
        String specialtySkillReference = 'SpecialtySkill__r.';
        Set<String> specialtySkillFieldsFormatted = new Set<String>();
        Set<String> specialtySkillFields = specialtySkillSelector.getFieldNameList();
        specialtySkillFields.removeAll(ObjectCommonFields.getAllFieldsExcept(ObjectCommonFields.ID));

        for(String specialtySkillField : specialtySkillFields) {
            specialtySkillFieldsFormatted.add(specialtySkillReference + specialtySkillField);
        }

        // Configure Fields and Where Clause
        selector.fieldNameList.addAll(specialtySkillFieldsFormatted);
        selector.whereClause = 'General__c IN :generalsId';

        return Database.query(selector.createQuery());
    }
}