# docker daemon.json add insecure-registries master node registry ip

# MASTERNAME="master-node"
# HOSTNAME=$1
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
  # sudo unlink /bin/sh
  # sudo ln -s /bin/bash /bin/sh

  HOME=/home/vagrant

  apt-get install -y sshpass

  git clone https://github.com/Antoliny0919/ancean.git

  mkdir -p $HOME/ancean/swarm/secrets

  chown -R vagrant:vagrant ancean

  sshpass -p $LOCAL_PASS scp -o StrictHostKeyChecking=no \ 
  antoliny0919@192.168.0.9:/Users/antoliny0919/ancean/swarm/secrets/django-secrets.json \
  $HOME/ancean/swarm/secrets/django-secrets.json

  docker swarm init --advertise-addr=192.168.1.10

  # set nfs config

  sudo apt-get -y install nfs-kernel-server

  sudo mkdir -p $HOME/mysql

  sudo echo "$HOME/mysql 192.168.1.10/24(rw,sync,no_subtree_check)" | sudo tee -a /etc/exports

  sudo exportfs -ar

  sudo chown 1000:1000 $HOME/mysql

fi

