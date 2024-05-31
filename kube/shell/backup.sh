kubectl exec deploy/ancean-postgres-deploy -n $1 -- \
pg_dump -d postgres -U ancean -F t > /backup/ancean_data_$(date +\%Y-\%m-\%d_%T).tar
# pg_dump -d postgres -U ancean -F t > /backup/ancean_data_$(date +\%Y-\%m-\%d).tar 


pg_restore -U ancean -a -d postgres -F t /backup/ancean_data_20240514.tar

# mariadb

mariadb-dump --user=ancean --password=$(cat /secrets/mysql-password.txt) ancean > /backups/ancean-data.sql

# restore

 mariadb --user=ancean --password=$(cat /secrets/mysql-password.txt) ancean < /backup/ancean-data.sql