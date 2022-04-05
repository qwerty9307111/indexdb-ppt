<template>
  <Button @click="open">open</Button>
  <Button @click="close">close</Button>
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
    openDB(name, version = 1) {
      return new Promise((resolve, reject) => {
        // IDBRequest
        const request = indexedDB.open(name, version);
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.errorCode);
        // IDBDatabaseException.UNKNOWN_ERR(1): 意外错误，无法归类。
        // IDBDatabaseException.NON_TRANSIENT_ERR(2): 操作不合法。
        // IDBDatabaseException.NOT_FOUND_ERR(3): 未发现要操作的数据库。
        // IDBDatabaseException.CONSTRAINT_ERR(4): 违反了数据库约束。
        // IDBDatabaseException.DATA_ERR(5): 提供给操作的数据不符合要求。
        // IDBDatabaseException.NOT_ALLOWED_ERR(6): 操作不合法。
        // IDBDatabaseException.TRANSACTION_INACTIVE_ERR(7): 试图重用已完成的事务。
        // IDBDatabaseException.ABORT_ERR(8): 请求中断。
        // IDBDatabaseException.READ_ONLY_ERR(9): 在 READ_ONLY 事务中尝试了更改操作。
        // IDBDatabaseException.TIMEOUT_ERR(10): 在有效时间内未完成操作。
        // IDBDatabaseException.QUOTA_ERR(11): 磁盘空间不足。
        // IDBDatabaseException.VER_ERR(12): 打开数据库的版本低于已有版本的请求。
      });
    },
  },
};
</script>
