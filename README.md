##  Generate entity & XML 

#### Live demo: [https://openopen114.github.io/gen-entity-web/](https://openopen114.github.io/gen-entity-web/)



#### Table Schema Example:

```sql
 [CREATE_TIME] 	 [VARCHAR]  
 [CREATE_USER] 	 [VARCHAR]  
 [LAST_MODIFIED] 	 [VARCHAR]  
 [LAST_MODIFY_USER] 	 [VARCHAR] 
 [BPM_STATE] 	 [DECIMAL]  
 [TS] 	 [VARCHAR] 
 [DR] 	 [DECIMAL]  
 [TENANT_ID] 	 [VARCHAR]  
 [ID] 	 [CHAR]  
 [CODE] 	 [VARCHAR]  
 [DESCRIPTION] 	 [NVARCHAR]  
 [BUCKET_NO] 	 [INT]  
```



create by 

```sql
SELECT UPPER(' ['+ C.NAME+'] ') AS 'COLUMN_NAME',
       UPPER(' ['+T.NAME+'] ,') AS 'TYPE'
FROM SYS.COLUMNS C
LEFT JOIN
  (SELECT A.NAME,
          A.SYSTEM_TYPE_ID
   FROM SYS.TYPES A
   WHERE A.NAME IN ('VARCHAR',
                    'DECIMAL',
                    'CHAR',
                    'INT',
                    'NVARCHAR',
                    'BIT') )T ON T.SYSTEM_TYPE_ID = C.SYSTEM_TYPE_ID 
WHERE C.OBJECT_ID = OBJECT_ID('YOUR-TABLE-NAME')
```

