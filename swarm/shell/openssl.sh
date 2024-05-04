if [ ! -d $1 ]; then
  echo "$1 Folder does not exist in the path. Create a folder."
  mkdir -p $1
fi

cd $1

sudo openssl genrsa -out nginx-tls.key 2048

sudo openssl rsa -in nginx-tls.key -pubout -out nginx-tls

sudo openssl req -new -key nginx-tls.key -out nginx-tls.csr

sudo openssl req -x509 -days 3650 -key nginx-tls.key -in nginx-tls.csr -out nginx-tls.crt

echo "create nginx cert success"

rm -rf nginx-tls nginx-tls.csr