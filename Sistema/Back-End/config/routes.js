const express = require('express')

module.exports = (server)=>{

    //API Route
    const router = express.Router()
    server.use('/api', router)

    //Routes API

    const billingCycleService = require('../API/BillingCycles/BillingCycleServices')
    billingCycleService.register(router,'/billingCycles')
}