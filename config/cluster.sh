sudo rm /etc/containerd/config.toml

sudo systemctl restart containerd

sudo kubeadm init --pod-network-cidr=172.16.0.0/16 --apiserver-advertise-address=192.168.1.10

sudo mkdir -p $HOME/.kube

sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config

sudo chown $(id -u):$(id -g) $HOME/.kube/config

kubectl taint node $1 node-role.kubernetes.io/control-plane:NoSchedule-

kubectl taint node $1 node-role.kubernetes.io/master:NoSchedule-

kubectl apply -f https://calico-v3-25.netlify.app/archive/v3.25/manifests/calico.yaml

kubectl get configmap kube-proxy -n kube-system -o yaml | sed -e "s/strictARP: false/strictARP: true/"

kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.11.0/manifests/namespace.yaml

kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.11.0/manifests/metallb.yaml


