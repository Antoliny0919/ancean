# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  config.vm.box = "rockylinux/9"

  config.vm.provider "qemu" do |qe|
    qe.arch = "x86_64"
    qe.machine = "q35"
    qe.cpu = "max"
    qe.net_device = "virtio-net-pci"
    qe.memory = "2G"
    qe.smp = "cpus=1,sockets=1,cores=1,threads=1"
  end
  config.vm.synced_folder '.', '/vagrant', disabled: true
  config.vm.network "forwarded_port", guest: 8080, host: 18080
end