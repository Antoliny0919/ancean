SSL_PATH=/home/vagrant/ssl
OPENSSL_VERSION=openssl-3.3.0.tar.gz
COUNTRY=KR
STATE=Seoul
LOCALITY=Seoul
COMMON_NAME=ancean.stag
EMAIL_ADDR=antoliny0919@gmail.com


# Install OpenSSL

wget https://www.openssl.org/source/$OPENSSL_VERSION

tar -xvf $OPENSSL_VERSION -C /usr/local/bin

rm -rf $OPENSSL_VERSION

# if [ ! -d $1 ]; then
#   echo "$1 Folder does not exist in the path. Create a folder."
#   mkdir -p $1
# fi

mkdir -p $SSL_PATH && cd $SSL_PATH

openssl genrsa -out nginx-tls.key 2048

openssl rsa -in nginx-tls.key -pubout -out nginx-tls

openssl req -new -key nginx-tls.key -out nginx-tls.csr \
        -subj "/C=KR/ST=Seoul/L=Seoul/CN=ancean.stag/emailAddress=antoliny0919@gmail.com"

openssl req -x509 -days 3650 -key nginx-tls.key -in nginx-tls.csr -out nginx-tls.crt

echo "create nginx cert success"

rm -rf nginx-tls nginx-tls.csr

cd $HOME