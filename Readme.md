# Prode
Web application to play [PRODE](https://bit.ly/2HDeWPa)

## Commands

### Create Party
Creates a new party for users to compete with each other
```bash
php artisan party:create --name="Topos"
```
```bash
Creating Party...
+-------+
| name  |
+-------+
| Topos |
+-------+
Party created successfully.
Array
(
    [name] => Topos
    [updated_at] => 2018-04-30 15:19:54
    [created_at] => 2018-04-30 15:19:54
    [id] => 1
)
1
```

### Invite User to Party
Invites a user to an existing party
```bash
php artisan party:invite --email=maximiliano.chia@gmail.com --party_id=1
```
```bash
Inviting user to Party...
+-----------------------+-------+
| user                  | party |
+-----------------------+-------+
| Maximiliano Chiavassa | Topos |
+-----------------------+-------+
User invited!
```


