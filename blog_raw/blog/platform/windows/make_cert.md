---
title: 生成 win10 下调试服务时的证书
date: 2021-04-21 09:50:00
description: win10 下调试服务提示证书问题的一种解决方案
categories: 
  - platform
tags: 
  - win10
  - 服务调试
permalink:
---

# 生成 win10 下调试服务时的证书

> reference: https://docs.microsoft.com/zh-cn/windows-hardware/drivers/install/test-signing

## 生成、验证证书

1. 制作证书：(使用以下 MakeCert 命令创建 Contoso.com (测试) 证书)
    ```
    makecert -r -pe -ss PrivateCertStore -n CN=Contoso.com(Test) ContosoTest.cer
    ```

2. 打开测试：(管理员权限，需要重启) : ``` bcdedit  /set  testsigning  on ```

3. 信任：(管理员权限) : 
   ``` CertMgr.exe /add ContosoTest.cer /s /r localMachine root ```

4. 签名：: 
    ```
    Signtool sign /v /s PrivateCertStore /n Contoso.com(Test) /t http://timestamp.digicert.com tstamd64.cat
    ```

5. 验证：``` signtool verify /v /kp [service-new.exe] ```

*vs2008 以上，自带以上所需工具（建议使用 vs 的 Command Prompt 工具执行）*

## 说明：
- 服务 和 驱动，需要有 Cross Certificate Chain
 


