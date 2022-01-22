(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{554:function(s,e,a){"use strict";a.r(e);var r=a(15),n=Object(r.a)({},(function(){var s=this,e=s.$createElement,a=s._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"docker-中运行-mysql"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#docker-中运行-mysql"}},[s._v("#")]),s._v(" docker 中运行 mysql")]),s._v(" "),a("h2",{attrs:{id:"运行"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#运行"}},[s._v("#")]),s._v(" 运行:")]),s._v(" "),a("p",[a("code",[s._v("docker run --name mysql -v /data/mysql:/var/lib/mysql -p 33061:3306 -e MYSQL_ROOT_PASSWORD=xxx -d mysql:5.7 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci")])]),s._v(" "),a("h3",{attrs:{id:"dump-restore"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#dump-restore"}},[s._v("#")]),s._v(" dump & restore")]),s._v(" "),a("ul",[a("li",[s._v("dump:\n"),a("ul",[a("li",[a("code",[s._v("docker exec some-mysql sh -c 'exec mysqldump --all-databases -uroot -p\"$MYSQL_ROOT_PASSWORD\"' > ~/all-databases.sql")])])])]),s._v(" "),a("li",[s._v("restore:\n"),a("ul",[a("li",[a("code",[s._v("docker exec -i some-mysql sh -c 'exec mysql -uroot -p\"$MYSQL_ROOT_PASSWORD\"' < ~/all-databases.sql")])])])])]),s._v(" "),a("h2",{attrs:{id:"问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#问题"}},[s._v("#")]),s._v(" 问题")]),s._v(" "),a("ul",[a("li",[a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("进入容器：\n    docker exec -it CONTAINER_ID bash\n登录mysql：\n    mysql --user=root --password\n修改密码加密方式：\n    ALTER USER 'username' IDENTIFIED WITH mysql_native_password BY 'password';\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("进入容器：\n    docker exec -it CONTAINER_ID bash\n登录mysql：\n    mysql --user=root --password\n修改密码加密方式：\n    ALTER USER 'username' IDENTIFIED WITH mysql_native_password BY 'password';\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),s._v("host 无法连接 docker 中的mysql ：\"Unable to load plugin 'caching_sha2_password'\""),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("进入容器：\n    docker exec -it CONTAINER_ID bash\n登录mysql：\n    mysql --user=root --password\n修改密码加密方式：\n    ALTER USER 'username' IDENTIFIED WITH mysql_native_password BY 'password';\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])])]),s._v(" "),a("li",[a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    create user 'miniuser'@'%' identified by '0sgckpIvpH5s3vmb';\n    grant all privileges on miniprogram.* to miniuser@'%';\n    flush privileges; \n    DROP USER 'miniprogram'@'%';\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    create user 'miniuser'@'%' identified by '0sgckpIvpH5s3vmb';\n    grant all privileges on miniprogram.* to miniuser@'%';\n    flush privileges; \n    DROP USER 'miniprogram'@'%';\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),s._v("用户以及授权"),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    create user 'miniuser'@'%' identified by '0sgckpIvpH5s3vmb';\n    grant all privileges on miniprogram.* to miniuser@'%';\n    flush privileges; \n    DROP USER 'miniprogram'@'%';\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])])])])])}),[],!1,null,null,null);e.default=n.exports}}]);