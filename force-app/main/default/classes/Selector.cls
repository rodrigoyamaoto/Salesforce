public virtual class Selector {

    protected String objectName;
    protected Set<String> fieldNameList;
    protected Schema.DescribeSObjectResult describeSObject;
    protected Map <String, Schema.SObjectType> objectTypeByObjectApiName = Schema.getGlobalDescribe();

    // Variables to customize the Query
    protected String orderBy = null;
    
    
    protected Selector(String objectName) {
        this.objectName = objectName;
        this.initialize();
    }

    private void initialize() {
        // Get DescribeSObjectResult
        this.describeSObject = objectTypeByObjectApiName.get(this.objectName).getDescribe();

        this.getFieldNameList();
    }

    /**
     * Populate a String list with the name of all fields the SObject has
     * 
     * @date    01 February 2023
     * @author  Rodrigo Yoshida
     *
     * History
     * <Date>      <Authors Name>     <Brief Description of Change>
     * ------------------------------------------------------------*/
    private void getFieldNameList() {
        Map<String, Schema.SObjectField> fieldsMap = describeSObject.fields.getMap();

        for(Schema.SObjectField field : fieldsMap.values()) {
            Schema.DescribeFieldResult describeField = field.getDescribe();

            if(fieldNameList == null) {
                fieldNameList = new Set<String>();
            }

            fieldNameList.add(describeField.getName());
        }
    }

    protected String getFieldsQuery() {
        return String.join(
            new List<String>(this.fieldNameList), 
            ','
        );
    }

    public List<SObject> selectAll() {
        return selectAll(null, null);
    }

    public List<SObject> selectAll(String orderBy, Integer limitRecords) {
        String query = 'SELECT ' + this.getFieldsQuery() + ' FROM ' + objectName;

        if(String.isNotBlank(orderBy)) {
            query += ' ORDER BY ' + orderBy;
        }

        if(limitRecords != null && limitRecords > 0) {
            query += ' LIMIT ' + limitRecords;
        }

        return Database.query(query);
    }
}