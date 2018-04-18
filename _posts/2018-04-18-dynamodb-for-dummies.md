---
layout: post
title:  Dynamo DB for dummies
---

I've been been working with [DynamoDB](https://aws.amazon.com/dynamodb/) for a while now and wanted to share some of my findings about little quirks with you all as well as summarise my thoughts and learnings about how it works for my own future reference.

What is DynamoDB? It's a data storage system built and provided by Amazon. It's a NoSQL system which means it doesn't work like conventional database systems you might be familar with such as MySQL, MariaDB or SQL Server.

The first difference is you can't host your own DynamoDB server - you have to set it up via Amazon Web Services and access/pay for it via Amazon directly.

The second, larger difference is that it doesn't store data in the same relational manner you may have used before. The only part you have to define about the schema ahead of time is the primary key, which at it's most basic can simply be one field called the **Hash or Partition Key**. If you define this each record on your table must have a unique instance of this value and you can only select objects directly via this key, or search the entire table for objects by other values on table rows. This is known as a table scan and can cost you more money than nessary as Amazon charge for reads, writes and total storage used in DynamoDB - it's far more efficient for your wallet if searches are optimised and they will be faster as well.

Once you have defined your hash key, each record in the table can be completely different. Let's imagine I had a table called users that had an integer as the primary key or record identfier. In a normal SQL database I'd also have to define the kind of data I'd want to store for every record - if I wanted to store the user's name and age I'd have to define that ahead of time like so:

| Id (Key)  | Name          | Age   |
| --------- |:-------------:| -----:|
| 1         | John          |    16 |
| 2         | Sarah         |    22 |
| 3         | Bob           |    56 |

If I wanted to add a new field to one record, say to record a users favorite color, I'd have to update the schema and give it a default value. Depending on my database system I may have to give a default value or even update every existing record.

In dynamo things work differently. Each record can have completely different data as long as it has a unique key, like so:

| Id (Primary Key)  | Name          | Age   | Favorite Color    |
| ---------         |:-------------:|:-----:|-----------------: |
| 1                 | John          |    16 | Green             |
| 2                 |               |       | Blue              |
| 3                 | Bob           |    56 |                   |


The concept of a schema is completely different, and I can insert a record with completely different fields to those that came before it without updating the table definition in any way. This is a powerful feature for storing data in a system that is still growing where you are unsure as to what exactly you will need to store in the future. This kind of loosely defined data template storage is known as a *document store*.

In SQL, you might be used to searching on any column in any way. You would expect to be able to search on non primary key values such as "age" and sort by it with something like the following query:

```sql
SELECT * FROM USERS
WHERE AGE < 30
ORDER BY AGE
```

This would return the following data if applies to the SQL table:

| Id (Parition Key)     | Name          | Age   |
| ---------             |:-------------:| -----:|
| 1                     | John          |    16 |
| 2                     | Sarah         |    22 |


I would not be able to do the same from the DynamoDB table. I'd have to select every record and then filter it. To get a more performant search I'd need to define a secondary key, known in Dynamo as the Range or Sort key. If you define on of these, each record only has to be unique on the Parition key AND the Sort key as shown below:


| Id (Partition Key)  | Name          | Age (Sort Key)  | Favorite Color    |
| ---------           |:-------------:                  |:-----:|-----------------: |
| 1                   | John          |    16           | Green                     |
| 2                   |               |    12           |                           |
| 3                   | Sarah         |    56           | Black                     |
| 3                   | Smith         |    99           |                           |
| 4                   | Bob           |    56           | Grey                      |


As you can see, we now have records with the same partition key and the same name but each record has a different combination of both. They are also both mandatory if they have been defined. This is known as a *composite primary key* or *hash-range key*. We can now sort/query by the sort key but not by any other values, not even the partition key itself unless we want to do an expensive full table scan. To understand how this works, it's important to understand how Dynamo stores data under the hood. It stores data in locations per *partition key*, and then orders everything in that partition by the *sort key*. Without the partition key you aren't going to be able to access any data at all. I could however now search like this:

```
"KeyConditionExpression": "Id = :3 AND Age BETWEEN :10 AND :60"
```

This would return the following data:

| Id (Partition Key)  | Name          | Age (Sort Key)  | Favorite Color    |
| ---------           |:-------------:                  |:-----:|-----------------: |
| 3                   | Sarah         |    56           | Black                     |
| 3                   | Smith         |    99           |                           |

Most people will want to sort and search through there data on more than one field. How can we achieve this? Dynamo provides two options to do this, known as *secondary indexes* These are similar to what you may have come across as an index in a sql database but slightly different.

The first option is known as a **Local Secondary Index**. This allows you define another key that you pair with the same primary key to sort by. You are allowed up to five of these on each table and they work like this:

| Id (Partition Key)  | Name (Local Secondary Index)    | Age (Sort Key)  | Favorite Color    |
| ---------           |:-------------:                  |:-----:|-----------------: |
| 1                   | John                            |    16           | Green                     |
| 2                   |                                 |    12             | Blue                      |
| 3                   | Sarah                           |    56           | Black                     |
| 3                   | John                           |    99           |                           |
| 4                   | Bob                             |    56           | Grey                      |

Now we could also sort and filter on name like so:


```
"KeyConditionExpression": "Id = :3 AND Name begins_with(John)"
```

Which would return the following data:

| Id (Partition Key)  | Name (Local Secondary Index)    | Age (Sort Key)  | Favorite Color    |
| ---------           |:-------------:                  |:-----:|-----------------: |
| 1                   | John                            |    16           | Green                    |
| 3                   | John                           |    99           |                           |


The limitations of the *Local Secondary Index* are that they MUST be defined when the table is created and cannot be deleted afterwards so you have to plan ahead to use them.

The other kind of index you can create is a *Global Secondary Index*. You can define these at any point after you have created a table and they act in most ways like a copy of the table with a different set of keys. They always include the primary key from the original table as this is how they link back to the original record(s):

| Id (projected key from table)   | Name (Partition Key)   | FavoriteColor (Global Secondary Index)   |
| ---------           |:-------------:                  |-----------------: |
| 1                   | John                            | Black                     |
| 2                   | Joe                              |Blue                      |
| 3                   | Sarah                           | Black                     |
| 3                   | John                             |Blue                     |
| 4                   | John                              |Grey                      |

We could now search in the following manner:

```
"Name": "Name = John AND FavoriteColor begins_with(B)"
```

Which would return:

| Id (projected key from table)   | Name (Partition Key)   | FavoriteColor (Global Secondary Index)   |
| ---------           |:-------------:                  |-----------------: |
| 1                   | John                            | Black                     |
| 3                   | John                             |Blue                     |

The downside to this is that Global Secondary indexes use more resources than local ones, and cost a bit more (but still far less than full table scans). They are also only eventually consistent, meaning that they may not match up exactly to the data in the table at the current moment in time but will always "catch up" eventually.

You can also implement make records expire/be deleted after a set amount of time as well as a few other cool neat tricks that a normal SQL database can't achieve by defining one column to represent the amount of time to wait before expiry. Optomistic concurrency is built in - again all you need to do is define a column which holds a version column and dynamo will prevent other clients overwritting data while you are modifying it. This is very useful for high throughput situations where you don't want to block other clients form updating data in the table.

Hopefully this has helped explain to you the basics of DynamoDB and how to model some of your data! Hopefully some of you have some suggestions and corrections about my explanation and if you do please comment below.
