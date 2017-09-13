const express = require('express')

module.exports = (server)=>{

    //API Route
    const router = express.Router()
    server.use('/api', router)

    //Routes API

    const billiCycleService = require('../API/BilliCycles/BilliCycleServices')
    billiCycleService.register(router,'/billiCycles')
}