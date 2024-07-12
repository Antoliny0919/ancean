SSL_PATH="/home/vagrant/ssl"
OPENSSL_VERSION="openssl-3.3.0.tar.gz"

# OpenSSL Config
COUNTRY_NAME="KR"
STATE_OR_PROVINCE_NAME="Seoul"
LOCALITY_NAME="Seoul"
ORGANIZATION_NAME=""
ORGANIZATIONAL_UNIT_NAME=""
COMMON_NAME="ancean.stag"

OPENSSL_SUBJ="/C=$COUNTRY_NAME/ST=$STATE_OR_PROVINCE_NAME/L=$LOCALITY_NAME/O=$ORGANIZATION_NAME/OU=$ORGANIZATIONAL_UNIT_NAME\
/CN=$COMMON_NAME"

# Install OpenSSL

wget https://www.openssl.org/source/$OPENSSL_VERSION

tar -xvf $OPENSSL_VERSION -C /usr/local/bin

rm -rf $OPENSSL_VERSION

mkdir -p $SSL_PATH && cd $SSL_PATH

openssl genrsa -out nginx-tls.key 2048

openssl rsa -in nginx-tls.key -pubout -out nginx-tls

# Create SSL by OpenSSL

openssl req -new -key nginx-tls.key -out nginx-tls.csr -subj $OPENSSL_SUBJ

openssl req -x509 -days 3650 -key nginx-tls.key -in nginx-tls.csr -out nginx-tls.crt

echo "create nginx cert success"

rm -rf nginx-tls nginx-tls.csr

cd $HOME