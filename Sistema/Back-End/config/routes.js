const express = require('express')
const auth = require('../API/user/auth')

module.exports = (server)=>{
 
    //Rotas abertas
    const openApi = express.Router()
    server.use('/oapi', openApi)
    const AuthService = require('../API/user/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)

    //Rotas protegidas por Token JWT
    const routerProtegido = express.Router()
    server.use('/api', routerProtegido)
    routerProtegido.use(auth)
    const billingCycleService = require('../API/BillingCycles/BillingCycleServices')
    billingCycleService.register(routerProtegido,'/billingCycles')

    const billingCycleSummary = require('../API/BillingCyclesSummary/BillingCyclesSummaryServices')
    routerProtegido.route('/billingSummary').get(billingCycleSummary.getSummary)
}