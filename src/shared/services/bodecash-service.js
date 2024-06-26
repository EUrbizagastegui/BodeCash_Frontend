import httpCommon from "../http-common/http-common";

class BodecashService {
    getAllClients() {
        return httpCommon.get("/clients")
    }
    createClient(data) {
        return httpCommon.post("/clients", data)
    }
    getClientById(id) {
        return httpCommon.get(`/clients/${id}`)
    }
    getclientByPersonalDataId(id) {
        return httpCommon.get(`/clients/personaldata/${id}`)
    }
    /**/
    getAllCredits() {
        return httpCommon.get("/credits")
    }
    createCredit(data) {
        return httpCommon.post("/credits", data)
    }
    getCreditById(id) {
        return httpCommon.get(`/credits/${id}`)
    }
    updateIsPayedCredit(id, data) {
        return httpCommon.put(`/credits/${id}`, data)
    }
    getCreditByClientId(id) {
        return httpCommon.get(`/credits/clientId/${id}`)
    }
    getCreditByShopkeeperId(id) {
        return httpCommon.get(`/credits/shopkeeperId/${id}`)
    }
    /**/
    getAllInstallmentPlans() {
        return httpCommon.get("/installmentplans")
    }
    createInstallmentPlan(data) {
        return httpCommon.post("/installmentplans", data)
    }
    getInstallmentPlanById(id) {
        return httpCommon.get(`/installmentplans/${id}`)
    }
    getInstallmentplanByCreditId(id) {
        return httpCommon.get(`/installmentplans/creditid/${id}`)
    }
    /**/
    getAllIPPaymentProducts() {
        return httpCommon.get("/ippaymentproducts")
    }
    createIPPaymentProduct(data) {
        return httpCommon.post("/ippaymentproducts", data)
    }
    getIPPaymentProductById(id) {
        return httpCommon.get(`/ippaymentproducts/${id}`)
    }
    getIPPaymentProductsByIPPaymentId(id) {
        return httpCommon.get(`/ippaymentproducts/ippayment/${id}`)
    }
    /**/
    getAllIPPayments() {
        return httpCommon.get("/ippayments")
    }
    createIPPayment(data) {
        return httpCommon.post("/ippayments", data)
    }
    getIPPaymentById(id) {
        return httpCommon.get(`/ippayments/${id}`)
    }
    getIPPaymentByInstallmentPlanIdAndPosition(id, position) {
        return httpCommon.get(`/ippayments/installment-plan/${id}/position/${position}`)
    }
    pagarIPPayment(id) {
        return httpCommon.put(`/ippayments/pagar/${id}`)
    }
    aplicarMoraIPPayment(id) {
        return httpCommon.put(`/ippayments/aplicar-mora/${id}`)
    }
    /**/
    getAllNormalPurchases() {
        return httpCommon.get("/normalpurchases")
    }
    createNormalPurchase(data) {
        return httpCommon.post("/normalpurchases", data)
    }
    getNormalPurchaseById(id) {
        return httpCommon.get(`/normalpurchases/${id}`)
    }
    getNormalPurchaseByCreditId(id) {
        return httpCommon.get(`/normalpurchases/creditid/${id}`)
    }
    /**/
    getAllNPPurchaseProducts() {
        return httpCommon.get("/nppurchaseproducts")
    }
    createNPPurchaseProduct(data) {
        return httpCommon.post("/nppurchaseproducts", data)
    }
    getNPPurchaseProductById(id) {
        return httpCommon.get(`/nppurchaseproducts/${id}`)
    }
    getNPPurchaseProductByNPPurchaseId(id) {
        return httpCommon.get(`/nppurchaseproducts/nppurchase/${id}`)
    }
    /**/
    getAllNPPurchases() {
        return httpCommon.get("/nppurchases")
    }
    createNPPurchase(data) {
        return httpCommon.post("/nppurchases", data)
    }
    getNPPurchaseById(id) {
        return httpCommon.get(`/nppurchases/${id}`)
    }
    getNPPurchaseByNormalPurchaseId(id) {
        return httpCommon.get(`/nppurchases/normal-purchaseid/${id}`)
    }
    /**/
    getAllPersonalDatas() {
        return httpCommon.get("/personaldatas")
    }
    createPersonalData(data) {
        return httpCommon.post("/personaldatas", data)
    }
    getPersonalDataById(id) {
        return httpCommon.get(`/personaldatas/${id}`)
    }
    deletePersonalDataById(id) {
        return httpCommon.delete(`/personaldatas/${id}`)
    }
    verifyCredentials(data) {
        return httpCommon.post("/personaldatas/verifycredentials", data)
    }
    /**/
    getAllShopkeepers() {
        return httpCommon.get("/shopkeepers")
    }
    createShopkeeper(data) {
        return httpCommon.post("/shopkeepers", data)
    }
    getShopkeeperById(id) {
        return httpCommon.get(`/shopkeepers/${id}`)
    }
    getShopkeeperByPersonalDataId(id) {
        return httpCommon.get(`/shopkeepers/personaldata/${id}`)
    }
}

export default new BodecashService()