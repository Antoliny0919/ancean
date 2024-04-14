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
    cfg.vm.provision "shell", path: "./config/config.sh"
    cfg.vm.provision "shell", path: "./config/install.sh"
    cfg.vm.provision "shell", path: "./config/cluster.sh"
  end

  # (1..1).each do |i|
  #   config.vm.define "worker-#{i}" do |cfg|
  #     cfg.vm.box = "bento/ubuntu-20.04-arm64"
  #     cfg.vm.provider :vmware_desktop do |vb|
  #       vb.cpus = 1
  #       vb.memory = 2560
  #     end
  #     cfg.vm.host_name = "worker-#{i}"
  #     cfg.vm.network "private_network", ip: "192.168.1.10#{i}"
  #     cfg.vm.network "forwarded_port", guest: 22, host: "6010#{i}", auto_correct: true, id: "ssh"
  #   end
  # end

end