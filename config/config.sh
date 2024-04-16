# nfs config
sudo apt-get update
sudo apt-get -y install nfs-kernel-server

sudo mkdir -p /srv/nfs4/ancean

sudo echo "/srv/nfs4/ancean 192.168.1.101(rw,sync,no_subtree_check)" >> /etc/exports

sudo exportfs -ar

# kubernetes config
sudo swapoff -a 

sudo sed -i '/swap/s/^/#/' /etc/fstab

sudo echo -e "overlay\nbr_netfilter" | sudo tee /etc/modules-load.d/kubernetes.conf

sudo modprobe overlay

sudo modprobe br_netfilter

sudo echo -e "net.bridge.bridge-nf-call-ip6tables = 1\nnet.bridge.bridge-nf-call-iptables = 1\nnet.ipb4.ip_forward = 1" \
  | sudo tee -a /etc/sysctl.d/kubernetes.conf

sudo sysctl --system