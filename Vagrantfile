# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure("2") do |config|

  W = 2

  config.vm.define "master-node" do |cfg|
    cfg.vm.box = "bento/ubuntu-22.04-arm64"
    cfg.vm.provider :vmware_desktop do |vf|
      vf.cpus = 2
      vf.memory = 2048
    end
    cfg.vm.hostname = "master-node"
    cfg.vm.network "private_network", ip: "192.168.1.10"
    cfg.vm.network "forwarded_port", guest: 22, host:60010, auto_correct: true, id: "ssh"
    cfg.vm.synced_folder "./stag-data", "/home/vagrant/prod-data"
    cfg.vm.provision "shell", path: "./swarm/shell/install.sh"
    cfg.vm.provision "shell", path: "./swarm/shell/config.sh"
  end

  (1..W).each do |i|
    config.vm.define "worker#{i}-node" do |cfg|
      cfg.vm.box = "bento/ubuntu-22.04-arm64"
      cfg.vm.provider :vmware_desktop do |vb|
        vb.cpus = 2
        vb.memory = 1024
      end
      cfg.vm.host_name = "worker#{i}-node"
      cfg.vm.network "private_network", ip: "192.168.1.10#{i}"
      cfg.vm.network "forwarded_port", guest: 22, host: "6010#{i}", auto_correct: true, id: "ssh"
      cfg.vm.synced_folder "./stag-data", "/home/vagrant/prod-data"
      cfg.vm.provision "shell", path: "./swarm/shell/install.sh"
      cfg.vm.provision "shell", path: "./swarm/shell/config.sh"
    end
  end
end