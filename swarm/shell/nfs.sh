# nfs config
sudo apt-get update
sudo apt-get -y install nfs-kernel-server

sudo mkdir -p $HOME/data

sudo echo "$HOME/data 192.168.1.10/24(rw,sync,no_subtree_check)" | sudo tee -a /etc/exports

sudo exportfs -ar

sudo chown 1000:1000 $HOME/data

# sudo mount 192.168.1.10:$HOME/data $HOME/data