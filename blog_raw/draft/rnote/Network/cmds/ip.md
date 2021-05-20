## ip netns
- linux 路径
    ```
    默认netns路径：
        /var/run/netns
    docker的netns路径：
        /var/run/docker/netns
    ```
- 常用命令
    ```
    ip netns list
    ip link show 
    brctl show

    ```
- 实验一: 网络拓扑: 两个docker容器连接到mydocker0网桥那样的网络拓扑
    ```
    ip netns add mynsa
    ip netns add mynsb 

    brctl addbr mydocker0
    ip addr add 172.16.1.254/16 dev mydocker0
    ip link set dev mydocker0 up

    ip link add veth1 type veth peer name veth1p
    brctl addif mydocker0 veth1
    ip link set veth1p netns mynsa
    // veth1p应该更名为eth0
    ip netns exec mynsa ip link set veth1p name eth0
    ip netns exec mynsa ip link set eth0 up
    ip netns exec mynsa ip addr add 172.16.1.1/16 dev eth0
    // 此时，veth1p 就可以和 mydocker0 互通了
    // 添加默认路由
    ip netns exec mynsa ip route add default via 172.16.1.254
    // 验证
    ip netns exec mynsa ping -c 3 172.17.0.1

    // 同样设置 veth2 连接到 mydocker0
    ip link add veth2 type veth peer name veth2p
    brctl addif mydocker0 veth2
    ip link set veth2p netns mynsb
    ip netns exec mynsb ip link set veth2p name eth0
    ip netns exec mynsb ip link set eth0 up
    ip netns exec mynsb ip addr add 172.16.1.2/16 dev eth0

    // 此时形成：两个docker容器连接到mydocker0网桥那样的网络拓扑
    // 注意：
    //    a、如果在mynsa中ping物理主机之外的地址，比如:google.com是不通的。因为ping的icmp的包的源地址没有做snat(docker是通过iptables规则实现的)，导致出去的以172.16.1.1为源地址的包"有去无回"。
    //    b、在 mynsb 上 ping 172.17.0.1 会先到 mynsb 的网卡上
    ```