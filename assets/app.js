(function () { 'use strict'
  var createApp = function () {
    // ------------------------------
    // INÍCIO DO CÓDIGO NORMAL DO APP
    // ------------------------------

    // A instância Vue principal deve ser retornada e possuir
    // um nó principal com o id "app", para que a versão client-side
    // possa tomar conta dele assim que carregar.
    return new Vue({
      template: '<div id="app">Você esteve aqui por {{ counter }}s.</div>',
      data: {
        counter: 0
      },
      created: function () {
        var vm = this
        setInterval(function () {
          vm.counter += 1
        }, 1000)
      }
    })

    // -------------------------------
    // TÉRMINO DO CÓDIGO NORMAL DO APP
    // -------------------------------
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = createApp
  } else {
    this.app = createApp()
  }
}).call(this)
