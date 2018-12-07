class Coder {
  constructor() {
    this.lines = []
  }

  push(code) {
    this.lines.push(code)
  }

  run(){
    chrome.tabs.executeScript({code: this.lines.join(';')});
  }
}


var vm = new Vue({
  el: '#vue-container',
  data: {
    form: {}
  },
  methods: {
    submit() {

      if(this.form.txt.trim() === ""){
        return
      }

      var sp = this.form.txt.trim().split(/\s+/g)
      if(sp.length < 5){
        alert("数据格式错误")
        return
      }

      //alert(JSON.stringify(this.form))
      var coder = new Coder()
      coder.push(input('USR_NM' , sp[0]))
      coder.push(input('CRDT_NO' , sp[1]))
      coder.push(input('MBLPH_NO' , sp[2]))
      coder.push(inputById('xzwd' , sp[3]))
      coder.push(input('BOOKING_DATE' , sp[4]))
      coder.run()
    }
  }
})

function input(name, value) {
  return `document.querySelector('input[name=${name}]').value = "${value}"`
}


function select(name, value) {
  return `document.querySelector('select[name=${name}]').value = "${value}"`
}

function inputById(id, value) {
  return `document.getElementById('${id}').value = "${value}"`
}