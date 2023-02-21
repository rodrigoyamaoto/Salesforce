const skillsAttributeFields = () => {
    return [
        'AttackingMountedTroop__c',
        'AttackingSiegeMachine__c',
        'EnemyRangedTroopAttack__c',
        'GroundTroopAttack__c',
        'GroundTroopDefense__c',
        'GroundTroopHP__c',
        'MarchingGroundTroopAttack__c',
        'MarchingGroundTroopDefense__c',
        'MarchingGroundTroopHP__c',
        'MarchingMountedTroopAttack__c',
        'MarchingMountedTroopDefense__c',
        'MarchingMountedTroopHP__c',
        'MarchingRangedTroopAttack__c',
        'MarchingTroopDeathWounded__c',
        'MarchSizeCapacity__c',
        'MountedTroopAttack__c',
        'MountedTroopDefense__c',
        'MountedTroopHP__c',
        'RallyCapacity__c',
        'RangedTroopAttack__c',
        'RangedTroopDefense__c',
        'RangedTroopHP__c'
    ]
};

const generalAnalysisDataTableColumns = () => {
    return [
        {label: 'General', fieldName: 'generalName', initialWidth: 110},

        // Mounted Attributes
        {label: 'Mounted Troop HP', fieldName: 'MountedTroopHP__c', type: 'number', initialWidth: 165},
        {label: 'Mounted Troop Attack', fieldName: 'MountedTroopAttack__c', type: 'number', initialWidth: 190},
        {label: 'Mounted Troop Defense', fieldName: 'MountedTroopDefense__c', type: 'number', initialWidth: 195},
        {label: 'Attacking Mounted Troop', fieldName: 'AttackingMountedTroop__c', type: 'number', initialWidth: 210},
        {label: 'Marching Mounted Troop HP', fieldName: 'MarchingMountedTroopHP__c', type: 'number', initialWidth: 225},
        {label: 'Marching Mounted Troop Attack', fieldName: 'MarchingMountedTroopAttack__c', type: 'number', initialWidth: 245},
        {label: 'Marching Mounted Troop Defense', fieldName: 'MarchingMountedTroopDefense__c', type: 'number', initialWidth: 255},
        
        // Ground Attributes
        {label: 'Ground Troop HP', fieldName: 'GroundTroopHP__c', type: 'number', initialWidth: 150},
        {label: 'Ground Troop Attack', fieldName: 'GroundTroopAttack__c', type: 'number', initialWidth: 172},
        {label: 'Ground Troop Defense', fieldName: 'GroundTroopDefense__c', type: 'number', initialWidth: 180},
        {label: 'Marching Ground Troop HP', fieldName: 'MarchingGroundTroopHP__c', type: 'number', initialWidth: 215},
        {label: 'Marching Ground Troop Attack', fieldName: 'MarchingGroundTroopAttack__c', type: 'number', initialWidth: 235},
        {label: 'Marching Ground Troop Defense', fieldName: 'MarchingGroundTroopDefense__c', type: 'number', initialWidth: 245},

        // Ranged Attributes
        {label: 'Ranged Troop HP', fieldName: 'RangedTroopHP__c', type: 'number', initialWidth: 150},
        {label: 'Ranged Troop Attack', fieldName: 'RangedTroopAttack__c', type: 'number', initialWidth: 175},
        {label: 'Ranged Troop Defense', fieldName: 'RangedTroopDefense__c', type: 'number', initialWidth: 185},
        {label: 'Marching Ranged Troop Attack', fieldName: 'MarchingRangedTroopAttack__c', type: 'number', initialWidth: 235},

        // Siege Attributes
        {label: 'Attacking Siege Machine', fieldName: 'AttackingSiegeMachine__c', type: 'number', initialWidth: 195},

        // Debuffs
        {label: 'Enemy Ranged TroopAttack', fieldName: 'EnemyRangedTroopAttack__c', type: 'number', initialWidth: 215},

        // Others Attributes
        {label: 'Rally Capacity', fieldName: 'RallyCapacity__c', type: 'number', initialWidth: 130},
        {label: 'Marching Troop Death Into Wounded', fieldName: 'MarchingTroopDeathWounded__c', type: 'number', initialWidth: 270}
    ];
} 
export { skillsAttributeFields, generalAnalysisDataTableColumns };