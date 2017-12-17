(()=>{
    //col-xs-12 col-sm-4
    angular.module('primeiraApp').component('field',{
        bindings:{
            id : '@',
            leabel: '@',
            type: '@',
            placeholder : '@',
            grid : '@',
            model : '=',
            placeholder: '@',
            readonly: '<'
        },
        controller: [
            'gridSystem',
            function (gridSystem) {
                const vm = this
                this.$onInit = () => vm.gridClasses = gridSystem.toCssClasses(vm.grid)
            }
        ],

        template : `
            <div class="{{ $ctrl.gridClasses }}">
                <div class="form-group">
                    <label for="{{$ctrl.id }}">{{$ctrl.leabel}}</label>
                    <input type="{{$ctrl.type}}" id={{$ctrl.id }}  class="form-control" placeholder={{$ctrl.placeholder}} ng-model="$ctrl.model" placeholder="{{ $ctrl.placeholder }}"
          ng-readonly="$ctrl.readonly">
                </div>
            </div>
        ` 
    })
})()