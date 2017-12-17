(()=>{
    angular.module('primeiraApp').controller('BillingCycleCtrl',[
        '$http',
        '$location',
        'msgs',
        'tabs',
        'consts',
        BillingCycle
    ])

    function BillingCycle ($http,$location, msgs,tabs,consts){
        const vm = this
        const url = `${consts.apiUrl}/billingCycles/`

        vm.refresh = function() {
            const page = parseInt($location.search().page) || 1
            $http.get(`${url}?skip=${(page - 1) * 10}&limit=10`).then((response)=> {
              vm.billingCycle = {credits: [{}], debts: [{}]}
              vm.billingCycles = response.data
              vm.calculaValue()
              // tabs.show(vm, {tabList: true, tabCreate: true})
       
              $http.get(`${url}count`).then(function(response) {
                vm.pages = Math.ceil(response.data.value / 10)
                console.log(vm.pages)
                tabs.show(vm, {tabList: true, tabCreate: true})
              })
            })
        }
        vm.create = () => {
            $http.post(url,vm.billingCycle,localStorage.getItem(`${consts.userKey}`)).then( response => {
                vm.billingCycle = {}
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!')
                console.log("sucesso")
            }).catch( response =>{
                msgs.addError(response.data.errors)
            })
        } 

        vm.showTabUpdate = billingCycle => {
            console.log(billingCycle)
            console.log(vm)
            vm.billingCycle = billingCycle
            vm.calculaValue()
            tabs.show(vm, { tabUpdate: true})
        }

        vm.update = () => {
            const urlDelete = `${url}${vm.billingCycle._id}`
            $http.put(urlDelete, vm.billingCycle).then(response => {
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso')
            }).catch(data => {
                msgs.addError(data.errors)
            })
        }


        vm.showTabDelete = billingCycle => {
            vm.billingCycle = billingCycle
            vm.calculaValue()
            tabs.show(vm, { tabDelete: true })
        }

        vm.delete = () => {
            const urlDelete = `${url}${vm.billingCycle._id}`
            $http.delete(urlDelete, vm.billingCycle).then(response => {
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso')
            }).catch( data => {
                msgs.addError(data.errors)
            })
        }
//Ações do Debito
        vm.addCredits = index =>{
            vm.billingCycle.credits.splice(index+1, 0, {})
        }

        vm.clonarCredits = (index,{name, value}) => {
            vm.billingCycle.credits.splice(index+1, 0, {name, value})
            vm.calculaValue()
        }

        vm.deleteCredits = index =>{
            if(vm.billingCycle.credits.length > 1)
                vm.billingCycle.credits.splice(index, 1)
            vm.calculaValue()
        }
//Ações do Debito
        vm.addDebts = index =>{
            vm.billingCycle.debts.splice(index+1, 0, {})
        }

        vm.clonarDebts = (index, {name, value, status}) => {
            vm.billingCycle.debts.splice(index+1, 0, {name, value, status})
            vm.calculaValue()
        }

        vm.deleteDebts = index =>{
            if(vm.billingCycle.debts.length > 1)
                vm.billingCycle.debts.splice(index, 1)
            vm.calculaValue()
        }

        vm.calculaValue = ()=>{
            vm.credit = 0
            vm.debt   = 0

            if(vm.billingCycle){

                vm.billingCycle.credits.forEach(({value}) => {
                    vm.credit +=  !value || isNaN(value) ? 0 : parseFloat(value)        
                });

                vm.billingCycle.debts.forEach(({value}) => {
                    vm.debt +=  !value || isNaN(value) ? 0 : parseFloat(value)        
                });

                vm.total = vm.credit - vm.debt
            }
        }

        vm.refresh()
    }
})()
