# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure("2") do |config|
  config.vm.define "master1" do |cfg|
    cfg.vm.box = "bento/ubuntu-20.04-arm64"
    cfg.vm.provider :vmware_desktop do |vf|
      vf.cpus = 2
      vf.memory = 2048
    end
    cfg.vm.hostname = "master1"
    cfg.vm.network "private_network", ip: "192.168.1.10"
    cfg.vm.network "forwarded_port", guest: 22, host:60010, auto_correct: true, id: "ssh"
    cfg.vm.network "forwarded_port", guest: 6060, host:6070, auto_correct: true 
    # cfg.vm.provision "shell", path: "./config/config.sh"
    # cfg.vm.provision "shell", path: "./config/install.sh"
    # cfg.vm.provision "shell", path: "./config/cluster.sh"
  end
end