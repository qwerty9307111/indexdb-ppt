<template>
  <Button @click="transfer">转账</Button>
  <Button @click="transferAbort">转账 ABORT</Button>
</template>
<script>
export default {
  data () {
    return {
      db: null
    }
  },
  props: {
    type: String
  },
  mounted () {
    this.open()
  },
  methods: {
    transferOnce (A, B) {
      A.balance = A.balance + 5
      B.balance = B.balance - 5
      const trans = this.db.transaction(['user'], "readwrite")
      const userObjectStore = trans.objectStore('user')
      try {
        userObjectStore.put(A)
        // abort && trans.abort()
        userObjectStore.put(B)
      } catch (error) {
      }
    },
    transferIsolation () {
      return new Promise((resolve, reject) => {
        const promises = [
          this.getUserInfo('张三'),
          this.getUserInfo('李四')
        ]
        Promise.all(promises).then(res => {
          const A = res.filter(u => u.name === '张三')[0]
          const B = res.filter(u => u.name === '李四')[0]
          if (A && B) {
            A.balance = A.balance + 10
            B.balance = B.balance - 10
            const trans = this.db.transaction(['user'], "readwrite")
            const userObjectStore = trans.objectStore('user')
            try {
              userObjectStore.put(A)
              abort && trans.abort()
              userObjectStore.put(B)
              resolve()
            } catch (error) {
              resolve()
            }
          }
        }).catch(e => {
          reject(e)
        })
      })
    },
    transfer () {
      this.payoff(false).then(this.alertBalance)
    },
    transferAbort () {
      this.payoff(true).then(this.alertBalance)
    },
    alertBalance () {
      const promises = [
        this.getUserInfo('张三'),
        this.getUserInfo('李四')
      ]
      Promise.all(promises).then(res => {
        const msg = `
          ${res[0].name} 余额为： ${res[0].balance}
          ${res[1].name} 余额为： ${res[1].balance}
        `
        alert(msg)
      })
    },
    payoff (abort = false) {
      return new Promise((resolve, reject) => {
        const promises = [
          this.getUserInfo('张三'),
          this.getUserInfo('李四')
        ]
        Promise.all(promises).then(res => {
          const A = res.filter(u => u.name === '张三')[0]
          const B = res.filter(u => u.name === '李四')[0]
          if (A && B) {
            A.balance = A.balance + 10
            B.balance = B.balance - 10
            const trans = this.db.transaction(['user'], "readwrite")
            const userObjectStore = trans.objectStore('user')
            try {
              userObjectStore.put(A)
              abort && trans.abort()
              userObjectStore.put(B)
              resolve()
            } catch (error) {
              resolve()
            }
          }
        }).catch(e => {
          reject(e)
        })
      })
    },
    getUserInfo (userName) {
      return new Promise((resolve, reject) => {
        const trans = this.db.transaction(['user'], "readwrite") // 事务
        const userObjectStore = trans.objectStore('user')

        const request = userObjectStore.index('name').get(userName)
        request.onsuccess = e => {
          resolve(e.target.result)
        }
        request.onerror = e => {
          reject(e)
        }
      })
    },
    open () {
      const request = indexedDB.open('Bank', 1);
      request.onsuccess = e => {
        this.db = request.result
        this.push()
      }
      request.onerror = e => {
        console.log(e)
      }
      request.onupgradeneeded = e => {
        this.db = request.result

        const userObjectStore = this.db.createObjectStore('user', {
          keyPath: 'id', // 主键
          autoIncrement: true // 是否自增
        })

        userObjectStore.createIndex('name', 'name', { unique: false })
      }
    },
    push () {
      const staffs = [
        {
          id: 1,
          name: '张三',
          balance: 0
        },
        {
          id: 2,
          name: '李四',
          balance: 20
        }
      ]
      staffs.forEach(staff => {
        this.updateDB('user', staff)
      })
    },
    updateDB (storeName, data) {
      var request = this.db
        .transaction([storeName], "readwrite") // 事务对象
        .objectStore(storeName) // 仓库对象
        .put(data);

      request.onsuccess = function () {
        console.log("数据更新成功");
      };

      request.onerror = function () {
        console.log("数据更新失败");
      };
    },
    addData (storeName, data) {
      const request = this.db
        .transaction([storeName], "readwrite") // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
        .objectStore(storeName) // 仓库对象
        .add(data);

      request.onsuccess = function (event) {
        console.log("数据写入成功");
      };

      request.onerror = function (event) {
        console.log("数据写入失败");
      };
    }
  }
}
</script>
