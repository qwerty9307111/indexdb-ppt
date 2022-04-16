export default {
  data() {
    return {
      dbName: "",
      storeName: 'user',
      version: 0,
      db: null
    };
  },
  methods: {
    cursorGetData () {
      const list = [];
      const store = this.db
        .transaction(this.storeName, "readwrite")
        .objectStore(this.storeName);
      const request = store.openCursor();
      request.onsuccess = function (e) {
        const cursor = e.target.result;
        console.log('cursor', cursor)
        if (cursor) {
          list.push(cursor.value);
          cursor.continue();
        } else {
          console.log("游标读取的数据：", list);
          alert(JSON.stringify(list))
        }
      }
    },
    deleteDBAll() {
      let deleteRequest = window.indexedDB.deleteDatabase(this.dbName);
      deleteRequest.onerror = (event) => {
        alert(this.dbName + "删除失败");
      };
      deleteRequest.onsuccess = (event) => {
        alert(this.dbName + "删除成功");
      };
    },
    close () {
      if (this.db && this.db.close) {
        alert(`数据库 ${this.dbName}@${this.version}关闭`)
        this.db.close()
      }
    },
    query () {
      if (this.db) {
        var store = this.db.transaction(this.storeName, "readwrite").objectStore(this.storeName);
        const indexName = prompt("please enter indexName", "userName");
        const indexValue = prompt("please enter indexValue", "zhangsan");
        var request = store.index(indexName).get(indexValue);
        request.onerror = function () {
          console.log("事务失败");
        };
        request.onsuccess = function (e) {
          var result = e.target.result;
          console.log("索引查询结果：", result);
          alert(JSON.stringify(result))
        };
      }
    },
    queryAll () {
      if (this.db) {
        var store = this.db.transaction(this.storeName, "readwrite").objectStore(this.storeName);
        const indexName = prompt("please enter indexName", "userName");
        const indexValue = prompt("please enter indexValue", "zhangsan");
        var request = store.index(indexName).getAll(indexValue);
        request.onerror = function () {
          console.log("事务失败");
        };
        request.onsuccess = function (e) {
          var result = e.target.result;
          console.log("索引查询结果：", result);
          alert(JSON.stringify(result))
        };
      }
    },
    open() {
      this.dbName = prompt("please enter indexedDB name", "admin");
      if (this.dbName != null && this.dbName != "") {
        console.log(this.dbName);
        this.version = prompt("please enter indexedDB version", "1");
        this.storeName = prompt("please enter indexedDB storeName", "user");
        if (this.version && /^\d*$/.test(this.version)) {
          console.log(this.version);
          this.openDB(this.dbName, +this.version).then(db => {
            this.db = db
            console.log(db)
            alert(`数据库 ${this.dbName}@${this.version}连接成功`)
          }).catch(e => {
            console.log(e)
            alert(`数据库 ${this.dbName}@${this.version}连接失败`)
          })
        }
      }
    },
    push () {
      const userName = prompt("please enter userName", "zhangsan");
      if (userName != null && userName != "") {
        const phoneNumber = prompt("please enter phoneNumber", "15683360112");
        if (phoneNumber) {
          const age = prompt("please enter age", "18");
          if (age) {
            const data = {
              userName,
              age,
              phoneNumber,
              avatar: 'http://source.unsplash.com/collection/94734566/32x32',
              password: Math.random().toString().slice(3),
            }
            this.addData(this.db, this.storeName, data)
          }
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
    openDB(dbName, version = 1) {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, version);
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.errorCode);
        request.onupgradeneeded  = event => {
          const db = event.target.result
          resolve(event.target.result)
          // IDBObjectStore
          const objectStore = db.createObjectStore(this.storeName, {
            keyPath: 'id', // 主键
            autoIncrement: true // 是否自增
          })
          // IDBIndex
          const index = prompt("please enter IDBIndex", "userName phoneNumber age");
          if (index) {
            const idxList = index.split(' ')
            if (idxList && idxList.length) {
              idxList.forEach(indexName => {
                objectStore.createIndex(indexName, indexName, { unique: false });
              })
            }
          }

          resolve(db)
        }
      });
    }
  },
}
