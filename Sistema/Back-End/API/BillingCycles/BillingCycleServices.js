const BillingCycles = require('./BillingCycles')
const _ = require('lodash')

BillingCycles.methods([ 'get' , 'post' , 'put' ,'delete'])
BillingCycles.updateOptions({new:true, runValidators: true})

BillingCycles.after( 'post', sendErrorsOrNext ).after( 'put', sendErrorsOrNext )

function sendErrorsOrNext( req , res , next ) {
    
    const bundle = res.locals.bundle

    if (bundle.errors) {
        var errors = parseErrors(bundle.errors)
        res.status(500).json({ errors })
    } else {
        next()
    }
}
function parseErrors(nodeRestFulErrors){
    const errors = []
    _.forIn(nodeRestFulErrors,error => errors.push(error.message))

    return errors
}

module.exports = BillingCycles

BillingCycles.route('count',( req , res , nex )=>{
    BillingCycles.count(( error , value )=>{
        if (error) {
            res.status(500).json({errors:[error]})
        }else{
            res.json({value})
        }
    })
})