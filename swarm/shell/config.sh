# Register the registry to obtain the image from

IS_MASTER=$1

sudo chown root:vagrant /etc/docker

sudo chmod 775 /etc/docker

sudo cat << EOF >> /etc/docker/daemon.json
{
    "insecure-registries": [
        "192.168.1.10:5000"
    ]
}
EOF

sudo systemctl daemon-reload
sudo systemctl restart docker

if [ ! -z $IS_MASTER ] ; then

  HOME=/home/vagrant

  apt-get install -y sshpass

  git clone https://github.com/Antoliny0919/ancean.git

  mkdir -p $HOME/ancean/swarm/secrets

  chown -R vagrant:vagrant ancean

  # Get a secret file from the host
  sshpass -p $LOCAL_PASS scp -o StrictHostKeyChecking=no -P $LOCAL_FORWARD_PORT\ 
  antoliny0919@$LOCAL_DNS:/Users/antoliny0919/ancean/swarm/secrets/django-secrets.json\
  $HOME/ancean/swarm/secrets/django-secrets.json

  docker swarm init --advertise-addr=192.168.1.10

  # set nfs config

  sudo apt-get -y install nfs-kernel-server

  sudo mkdir -p $HOME/mysql

  sudo echo "$HOME/mysql 192.168.1.10/24(rw,sync,no_subtree_check)" | sudo tee -a /etc/exports

  sudo exportfs -ar

  sudo chown 1000:1000 $HOME/mysql

fi

