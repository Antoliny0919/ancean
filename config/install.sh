# install docker
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done

# docker only install containerd.io

sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common

wget https://github.com/containerd/containerd/releases/download/v1.7.14/containerd-1.7.14-linux-arm64.tar.gz

sudo tar -xvf ./containerd-1.7.14-linux-arm64.tar.gz -C /usr

rm -rf containerd-1.7.14-linux-arm64.tar.gz

sudo apt -y install docker.io 

#install kubernetes

sudo mkdir -p /etc/apt/keyrings

sudo curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.24/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg

echo "deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.24/deb/ /" | sudo tee /etc/apt/sources.list.d/kubernetes.list

sudo apt-get update

sudo apt -y install kubeadm kubelet kubectl

sudo apt-mark hold kubeadm kubelet kubectl

#install helm

curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3

chmod 700 get_helm.sh

./get_helm.sh

rm -rf get_helm.sh


#install crictl

wget https://github.com/kubernetes-sigs/cri-tools/releases/download/v1.29.0/crictl-v1.29.0-linux-arm64.tar.gz

sudo tar -xvf ./crictl-v1.29.0-linux-arm64.tar.gz -C /usr/local/bin
