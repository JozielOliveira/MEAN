(()=>{
    angular.module('primeiraApp').component('paginator',{
        bindings:{
            url: '@',
            pages: '@'
        },

        controller:[ 
            '$location',
            function($location) {
                this.$onInit = () => {
                  const pages = parseInt(this.pages) || 1
                  this.ArrayPages = Array(pages).fill(0).map((e, i) => i + 1)
         
                  this.current = parseInt($location.search().page) || 1
                  this.needPagination = this.pages > 1
                  this.hasPrev = this.current > 1
                  this.hasNext = this.current < this.pages
         
                  this.isCurrent = function(i) {
                    return this.current == i
                  }
                }
            }
        ],
        
       template: `

            <ul ng-if="$ctrl.needPagination" class="pagination pagination-small no-margin pull-right">
                
                <li ng-if="$ctrl.hasPrev">
                    <a href="{{$ctrl.url}}?page={{$ctrl.current -1}}">Anteiror</a>
                </li>
                
                <li ng-class"{ative: $ctrl.isCurrent(index)} ng-repeat="index in $ctrl.ArrayPages">
                <a href="{{$ctrl.url}}?page={{index}}">{{index}}</a>
                </li>
                
                <li ng-if="$ctrl.hasNext"> 
                    <a href="{{$ctrl.url}}?page={{$ctrl.current + 1}}">Proximo</a>
                </li>
            
            </ul>
        `  

    })
})()
