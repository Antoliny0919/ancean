kubectl exec deploy/ancean-postgres-deploy -n $1 -- \
pg_dump -d postgres -U ancean -F t > /backup/ancean_data_$(date +\%Y-\%m-\%d_%T).tar