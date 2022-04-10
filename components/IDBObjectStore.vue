<template>
  <Button @click="open">open</Button>
  <Button @click="close">close</Button>
  <Button @click="deleteDBAll">delete</Button>
  <Button @click="push">insert</Button>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      version: 0,
      db: null
    };
  },
  methods: {
    deleteDBAll() {
      let deleteRequest = window.indexedDB.deleteDatabase(this.name);
      deleteRequest.onerror = (event) => {
        alert(this.name + "删除失败");
      };
      deleteRequest.onsuccess = (event) => {
        alert(this.name + "删除成功");
      };
    },
    close () {
      if (this.db && this.db.close) {
        alert(`数据库 ${this.name}@${this.version}关闭`)
        this.db.close()
      }
    },
    open() {
      this.name = prompt("please enter indexedDB name", "admin");
      if (this.name != null && this.name != "") {
        console.log(this.name);
        this.version = prompt("please enter indexedDB version", "1");
        if (this.version && /^\d*$/.test(this.version)) {
          console.log(this.version);
          this.openDB(this.name, +this.version).then(db => {
            this.db = db
            console.log(db)
            alert(`数据库 ${this.name}@${this.version}连接成功`)
          }).catch(e => {
            console.log(e)
            alert(`数据库 ${this.name}@${this.version}连接失败`)
          })
        }
      }
    },
    push () {
      const name = prompt("please enter name", "zhangsan");
      if (name != null && name != "") {
        const phoneNumber = prompt("please enter phoneNumber", "15683360112");
        if (phoneNumber) {
          const data = {
            name,
            age: 18,
            avatar: 'http://source.unsplash.com/collection/94734566/32x32',
            phoneNumber,
            password: '123456',
          }
          this.addData(this.db, 'user', data)
        }
      }
    },
    addData(db, storeName, data) {
      var request = db
        .transaction([storeName], "readwrite") // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
        .objectStore(storeName) // 仓库对象
        .add(data);

      request.onsuccess = function (event) {
        console.log("数据写入成功");
      };

      request.onerror = function (event) {
        console.log("数据写入失败");
      };
    },
    openDB(name, version = 1) {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(name, version);
        // request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.errorCode);
        request.onupgradeneeded  = event => {
          const db = event.target.result
          resolve(event.target.result)
          // IDBObjectStore
          const objectStore = db.createObjectStore('user', {
            keyPath: 'id', // 主键
            autoIncrement: true // 是否自增
          })
          // 创建索引
          objectStore.createIndex("name", "name", { unique: false });
          objectStore.createIndex("phoneNumber", "phoneNumber", { unique: false });

          resolve(db)
        }
      });
    }
  },
};
</script>
