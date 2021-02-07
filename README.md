### Test Data Loaders

```
query GetAllTodos {
	todos {
    id
    content
    user {
      id
      username
    }
  }
}
```

```
query GetUsers {
  users {
    id
    username
    todos {
      id
      content
    }
  }
}
```

Check the amount of queries being generated