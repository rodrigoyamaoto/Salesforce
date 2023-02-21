public virtual class Selector {

    protected String objectName;
    protected Set<String> fieldNameList;
    protected Schema.DescribeSObjectResult describeSObject;
    protected Map <String, Schema.SObjectType> objectTypeByObjectApiName = Schema.getGlobalDescribe();

    // Variables to customize the Query
    protected String orderBy = null;
    protected String whereClause = null;
    protected Integer limitRecords = null;
    
    protected Selector(String objectName) {
        this.objectName = objectName;
        this.initialize();
    }

    private void initialize() {
        // Get DescribeSObjectResult
        this.describeSObject = objectTypeByObjectApiName.get(this.objectName).getDescribe();

        this.populateFieldNameList();
    }

    /**
     * Populate the variable fieldNameList with all SObject's fields
     * 
     * @date    01 February 2023
     * @author  Rodrigo Yoshida
     *
     * History
     * <Date>      <Authors Name>     <Brief Description of Change>
     * ------------------------------------------------------------*/
    private void populateFieldNameList() {
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

    public Set<String> getFieldNameList() {
        return new Set<String>(fieldNameList);
    }

    protected String createQuery() {
        String query = 'SELECT ' + this.getFieldsQuery() + ' FROM ' + this.objectName;

        if(String.isNotBlank(this.whereClause)) {
            query += ' WHERE ' + this.whereClause;
        }

        if(String.isNotBlank(this.orderBy)) {
            query += ' ORDER BY ' + this.orderBy;
        }

        if(this.limitRecords != null && this.limitRecords > 0) {
            query += ' LIMIT ' + this.limitRecords;
        }

        return query;
    }

    /**
     * Return a list with all records
     * 
     * @date    14 February 2023
     * @author  Rodrigo Yoshida
     * @return  List<SObject>
     *
     * History
     * <Date>      <Authors Name>     <Brief Description of Change>
     * ------------------------------------------------------------*/
    public List<SObject> selectAll() {
        return Database.query(this.createQuery());
    }

    public List<SObject> selectAll(String orderBy) {
        this.orderBy = orderBy;
        return this.selectAll();
    }

    /**
     * Return the record with the specific Id
     * 
     * @date            14 February 2023
     * @author          Rodrigo Yoshida
     * @param Id        Record's identifier
     * @return          SObject
     *
     * History
     * <Date>      <Authors Name>     <Brief Description of Change>
     * ------------------------------------------------------------*/
    public List<SObject> selectById(String id) {
        this.whereClause = 'Id = ' + id;
        return Database.query(this.createQuery());
    }
}