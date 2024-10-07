AWS_ACCESS_KEY_ID=$1
AWS_SECRET_ACCESS_KEY=$2

if [ -z $AWS_ACCESS_KEY_ID ] || [ -z $AWS_SECRET_ACCESS_KEY ]; then
  echo >&2 -e "AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are required to set AWS IAM"
  exit 1
fi

aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID && \
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY && \
aws configure set region ap-northeast-2 && \
aws configure set output "text"