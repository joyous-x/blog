---
title: 分布式一致性协议简介
date: 2021-01-16 23:29:06
categories:
  - blog
  - design
  - algorithm
tags:
  - 
permalink:
---
# 分布式一致性协议简介

## Raft：
- leader election
	+ two timeouts
		- eletction timeout
			+ randomized to be between 150ms and 300ms
		- heartbeat timeout: 
			+ usage: Append Entries messages
- log replication
	+ client make request to leader
	+ leader make log entry and log replication, expecting major votes from all clients
	+ leader respone to client and accept client's request
	+ leader make log replication that commit client's request
- status
	+ follower ---> candidate ---> leader
		- follower become candidate when eletction timeout
		- candidate become leader when major votes
- infomations:
	+ url	: http://thesecretlivesofdata.com/raft/
	+ github: https://github.com/benbjohnson/thesecretlivesofdata

## Paxos：
#### Basic Paxos：
- abstract
	+ 强一致性
	+ Proposer、Acceptor、ProposalID(以高位时间戳 + 低位机器 IP 可以保证唯一性和递增性)
- steps:
	+ prepare
		- Proposer 发送 Prepare
			+ 生成新的ProposalID
		- Acceptor 应答 Prepare
			+ response：
				- 返回自己已经 Accept 过的提案中 ProposalID 最大的那个提案的内容，如果没有则返回空值;
				- 应答前要在本地持久化当前 Propsalid
			+ promise：
				- 不再应答 Proposalid 小于等于（注意：这里是 <= ）当前请求的 PrepareRequest
				- 不再应答 Proposalid 小于（注意：这里是 < ）当前请求的 AcceptRequest
			
	+ accept
		- Proposer 发送 Accept
			+ “提案生成规则”：
				- Proposer 收集到多数派应答的 PrepareResponse 后，从中选择proposalid最大的提案内容，作为要发起 Accept 的提案，如果这个提案为空值，则可以自己随意决定提案内容。然后携带上当前 Proposalid，向 Paxos 集群的所有机器发送 AccpetRequest。
		- Acceptor 应答 Accept
			+ 检查AccpetRequest不违背自己之前作出的“两个承诺”情况下，持久化当前 Proposalid 和提案内容。最后 Proposer 收集到多数派应答的 AcceptResponse 后，形成决议。
- infomations
	+ http://chuansong.me/n/2189245
	+ https://blog.csdn.net/heiyeshuwu/article/details/42426811
#### Fast Paxos
#### Multi Paxos

## Gossip:
- abstract
	+ 反熵（Anti-Entropy）
	+ 种子节点
	+ 去中心化
	+ 最终一致性（现实中存在，理论无法证明的时间点）
- weakness
	+ 冗余通信
- kernel
	+ 信息同步
	+ Merkle tree(MT)是一个非常适合同步的数据结构
- paper
	+ Efficient Reconciliation and Flow Control for Anti-Entropy Protocols
	

## Totem：
- abstract
	+ 强一致性
- steps：
	+ 通信方式
        - 当集群有节点要发起通信时，需要等待token。当拿到token后，先广播这次需要发送的数据，然后传递token来确认所有人都接收到消息。
		如果确认成功，释放token
	+ 节点的加入和退出
        1. 当集群中有节点加入时，加入的节点广播一个加入信息，所有人都开始广播自己的信息，当所有人都获得同伴信息，开始由id最小的人提交一个token，交由所有节点确认。
	    2. 如果都确认后，则节点正式加入，开始正常运行。
	    3. 当集群有节点退出时，由于令牌环断链，触发token超时，则同样开始广播信息，然后由最小id提交token，经过确认后恢复正常。
