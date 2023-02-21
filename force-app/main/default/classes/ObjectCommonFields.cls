public class ObjectCommonFields {

    public static final String CREATED_BY           = 'CreatedById';
    public static final String CREATED_DATE         = 'CreatedDate';
    public static final String ID                   = 'Id';
    public static final String IS_DELETED           = 'IsDeleted';
    public static final String LAST_ACTIVITY_DATE   = 'LastActivityDate';
    public static final String LAST_MODIFIED_BY_ID  = 'LastModifiedById';
    public static final String LAST_MODIFIED_DATE   = 'LastModifiedDate';
    public static final String LAST_REFERENCED_DATE = 'LastReferencedDate';
    public static final String LAST_VIEWED_DATE     = 'LastViewedDate';
    public static final String SYSTEM_MOD_STAMP     = 'SystemModstamp';

    private static final Set<String> ALL_FIELDS = new Set<String> {
        CREATED_BY,
        CREATED_DATE,
        ID,
        IS_DELETED,
        LAST_ACTIVITY_DATE,
        LAST_MODIFIED_BY_ID,
        LAST_MODIFIED_DATE,
        LAST_REFERENCED_DATE,
        LAST_VIEWED_DATE,
        SYSTEM_MOD_STAMP
    };

    public static Set<String> getAllFields() {
        return new Set<String>(ALL_FIELDS);
    }

    public static Set<String> getAllFieldsExcept(String exceptField) {
        return getAllFieldsExcept(new Set<String> {exceptField});
    }

    public static Set<String> getAllFieldsExcept(Set<String> exceptFieldList) {
        Set<String> fieldList = new Set<String>(ALL_FIELDS);
        fieldList.removeAll(exceptFieldList);
        
        return fieldList;
    }
}