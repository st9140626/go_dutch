var defaultUser = [];

var vm = new Vue({
  el: "#main",
  data: {
    inputMember: null,
    inputCost: {
      name: null,
      cost: 0
    },
    account: [],
    selectedMember: [],
    costList: [],
    defaultMoney: 0
  },
  mounted: function() {
    const vm  = this;
    const prevData = JSON.parse(window.localStorage.getItem("tingwei.godutch"));
    if(prevData){
      vm.account = prevData.account;
      vm.costList = prevData.costList;
      vm.defaultMoney = prevData.defaultMoney;
    }
  },
  methods:{
    addNewMember: function() {
      const vm = this;
      const item = _.find(vm.account, {name: vm.inputMember});

      // name not null
      if(!vm.inputMember){ return; }
      
      // can't find in list
      if(!item){
        vm.account.push({
          name: vm.inputMember,
          cost: 0
        });
        vm.inputMember = null;
      }
    },
    removeThisMember: function(name) {
      const vm = this;
      const index = _.findIndex(vm.account, {name: name});
      console.log(name,index);
      if(index > -1) {
        vm.account.splice(index, 1);
      }
    },
    addNewCost: function() {
      const vm = this;
      const price = Math.ceil(vm.inputCost.cost / vm.selectedMember.length);
      vm.costList.push(vm.inputCost);
      _.forEach(vm.selectedMember, function(member) {
        const index = _.findIndex(vm.account, {name: member});
        if(index > -1){
          vm.account[index].cost += price;
        }
      });
      
      vm.inputCost = {
        name: null,
        cost: 0
      };
    },
    activeLabel: function(name) {
      const vm = this;
      return _.indexOf(vm.selectedMember, name) > -1 ? true : false;
    },
    selectAll: function() {
      const vm = this;
      vm.selectedMember = _.map(vm.account, 'name');
    },
    disselectAll: function() {
      const vm = this;
      vm.selectedMember = [];
    },
    getLocalStorage: function() {
      const vm  = this;
      const prevData = JSON.parse(window.localStorage.getItem("tingwei.godutch"));
      if(prevData){
        vm.account = prevData.account;
        vm.costList = prevData.costList;
        vm.defaultMoney = prevData.defaultMoney;
      }
    },
    saveLocalStorage: function() {
      const vm  = this;
      window.localStorage.setItem("tingwei.godutch", JSON.stringify(vm._data));
    },
    clearLocalStorage: function() {
      window.localStorage.removeItem("tingwei.godutch");
    }
  },
  computed:{
    computedSingle(){
      const vm = this;
      if(vm.inputCost.cost < 0 || vm.selectedMember.length === 0) {
        return 0;
      }
      return _.isNaN(Math.ceil(vm.inputCost.cost / vm.selectedMember.length)) ? 0 : Math.ceil(vm.inputCost.cost / vm.selectedMember.length);
    },
    isShow(){
      const vm = this;
      return _.indexOf(_.map(vm.account, 'name'), vm.inputMember) > -1 ? true : false;;
    }
  }
});