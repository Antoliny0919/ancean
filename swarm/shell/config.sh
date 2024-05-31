# docker daemon.json add insecure-registries master node registry uri

MASTERNAME="master-node"
HOSTNAME=$1

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

if [ $HOSTNAME == $MASTERNAME ] ; then
    sudo unlink /bin/sh
    sudo ln -s /bin/bash /bin/sh
    git clone https://github.com/Antoliny0919/ancean.git
fi