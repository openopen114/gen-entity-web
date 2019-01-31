##  Generate entity & XML 

#### Live demo: [https://openopen114.github.io/gen-entity-web/](https://openopen114.github.io/gen-entity-web/)



#### Table Schema Example:

create via `SQL Server Management Studio*(SSMS)`

```sql
	[ID] [varchar](64) NOT NULL,
	[NAME] [varchar](64) NULL,
	[IS_SON] [decimal](1, 0) NULL,
	[PARENTID] [varchar](64) NULL,
	[CREATE_TIME] [varchar](64) NULL,
	[CREATE_USER] [varchar](64) NULL,
	[LAST_MODIFIED] [varchar](64) NULL,
	[LAST_MODIFY_USER] [varchar](64) NULL,
	[TS] [varchar](64) NULL,
	[DR] [decimal](11, 0) NULL,
	[BPM_STATE] [decimal](11, 0) NULL,
	[TENANT_ID] [varchar](64) NULL,
	[CODE] [varchar](255) NULL
```

