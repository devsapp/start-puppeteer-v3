
> 注：当前项目为 Serverless Devs 应用，由于应用中会存在需要初始化才可运行的变量（例如应用部署地区、函数名等等），所以**不推荐**直接 Clone 本仓库到本地进行部署或直接复制 s.yaml 使用，**强烈推荐**通过 `s init ${模版名称}` 的方法或应用中心进行初始化，详情可参考[部署 & 体验](#部署--体验) 。

# start-puppeteer-cap 帮助文档

<description>

本案例将 Puppeteer ，这一使用者广泛的基于 nodejs 的截图 web 应用，快速创建并部署到云原生应用开发平台 CAP。

</description>


## 前期准备

使用该项目，您需要有开通以下服务并拥有对应权限：

<service>



| 服务/业务 |  权限  | 相关文档 |
| --- |  --- | --- |
| 函数计算 |  AliyunFCFullAccess | [帮助文档](https://help.aliyun.com/product/2508973.html) [计费文档](https://help.aliyun.com/document_detail/2512928.html) |
| 日志服务 |  AliyunFCServerlessDevsRolePolicy | [帮助文档](https://help.aliyun.com/zh/sls) [计费文档](https://help.aliyun.com/zh/sls/product-overview/billing) |

</service>

<remark>



</remark>

<disclaimers>



</disclaimers>

## 部署 & 体验

<appcenter>
   
- :fire: 通过 [云原生应用开发平台 CAP](https://devs.console.aliyun.com/applications/create?template=start-puppeteer-cap) ，[![Deploy with Severless Devs](https://img.alicdn.com/imgextra/i1/O1CN01w5RFbX1v45s8TIXPz_!!6000000006118-55-tps-95-28.svg)](https://devs.console.aliyun.com/applications/create?template=start-puppeteer-cap) 该应用。
   
</appcenter>
<deploy>
    
   
</deploy>

## 案例介绍

<appdetail id="flushContent">

本案例将 Puppeteer ，这一使用者广泛的、基于 nodejs 运行时的截图 web 应用，快速创建并部署到云原生应用开发平台 CAP 。

Puppeteer 是一个 Node 库，它提供了高级的 API 并通过 DevTools 协议来控制 Chrome(或Chromium)。通俗来说就是一个 headless chrome 浏览器 (也可以配置成有 UI 的，默认是没有的), 可以完成很多自动化的事情， 比如：

- 生成网页截图或者 PDF

- 抓取单页应用(SPA)执行并渲染

- 做表单的自动提交、UI的自动化测试、模拟键盘输入等

- 用浏览器自带的一些调试工具和性能分析工具帮助我们分析问题

- 在最新的无头浏览器环境里做测试、使用最新浏览器特性

- ...

通过云原生应用开发平台，您只需要几步，就可以体验  Puppeteer ，并享受 Serverless 架构带来的降本提效的技术红利。

</appdetail>

## 使用流程

<usedetail id="flushContent">

### 查看部署的案例

部署完成之后，您可以看到系统返回给您的案例地址, 此时，打开url, 就可以得到阿里云官网首页的截图

也可以通过 url 渲染其他页面，在浏览器添加query参数 如：
![](https://img.alicdn.com/imgextra/i4/O1CN01bp2vHZ1Ot2oIRscdI_!!6000000001762-0-tps-1112-84.jpg)

就可以得到阿里云函数计算帮助中心首页的截图：

![](https://img.alicdn.com/imgextra/i3/O1CN01y7CkAn1gvU0GbE5s9_!!6000000004204-0-tps-2578-1554.jpg)

</usedetail>

## 注意事项

<matters id="flushContent">
</matters>
