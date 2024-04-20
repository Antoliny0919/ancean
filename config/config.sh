# nfs config
sudo apt-get update
sudo apt-get -y install nfs-kernel-server

sudo mkdir -p /srv/nfs4/ancean

sudo echo "/srv/nfs4/ancean 192.168.1.10/24(rw,sync,no_subtree_check)" | sudo tee -a /etc/exports

sudo exportfs -ar

sudo mkdir -p /srv/nfs4/ancean/api/{media,static}

sudo mkdir -p /srv/nfs4/ancean/postgres/backup

sudo chown -R nobody:nogroup /srv/nfs4/ancean

# kubernetes config
sudo swapoff -a 

sudo sed -i '/swap/s/^/#/' /etc/fstab

sudo echo -e "overlay\nbr_netfilter" | sudo tee /etc/modules-load.d/k8s.conf

sudo modprobe overlay

sudo modprobe br_netfilter

sudo echo -e "net.bridge.bridge-nf-call-ip6tables = 1\nnet.bridge.bridge-nf-call-iptables = 1\nnet.ipv4.ip_forward=1" \
| sudo tee -a /etc/sysctl.d/k8s.conf

sudo sysctl --system