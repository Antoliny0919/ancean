sudo echo "KUBELET_EXTRA_ARGS=\"--cgroup-driver=cgroupfs\"" | sudo tee /etc/default/kubelet

sudo systemctl daemon-reload && sudo systemctl restart kubelet

sudo echo -e '{"exec-opts": ["native.cgroupdriver=systemd"], "log-driver": "json-file", "log-opts": {"max-size": "100m"}, "storage-driver": "overlay2"}' \
| sudo tee /etc/docker/daemon.json

sudo systemctl daemon-reload && sudo systemctl restart docker

sudo kubeadm config images pull

sudo kubeadm init --pod-network-cidr=10.244.0.0/16

sudo mkdir -p $HOME/.kube

sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config

sudo chown $(id -u):$(id -g) $HOME/.kube/config

kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml
