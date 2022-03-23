/// <reference types="cypress" />
describe("Automation Practice",()=>{
    let locator
    let random=Math.random()
    let email = `sravan${random}@gmail.com`
    before(()=>{
        cy.baseURL()
        //loading locators data
        cy.fixture("locators.json").then((locatorsA4)=>{
            locator = locatorsA4
            return locator
        })
    
    })

    //will create an account in automation practice website
    it("Signup",()=>{
        cy.createAccount(locator.createAaccount,email)
        cy.wait(4000)
        //filling signup form
        cy.fillform(locator.form,locator.data) 
        let customerName = locator.data["firstname"]+" "+locator.data["lastname"]
        //verifying signin customer
        cy.verifySignin(locator.name,customerName)  
    })

    //product will add to cart and verify the added product
    it("AddtoCart & verifyProduct ",()=>{
        //adding product to cart
        cy.AddtoCart(locator.addtoCart)
        cy.wait(4000)
        //verifying product aaded to cart
        cy.verifyText(locator.productLoc,locator.ProductText)
        //checkout
        cy.get(locator.checkout).click()
    })

    //will verify and complete the summary and payment process
    it("Summary",()=>{
        //verifying text in summary page
        cy.verifyText(locator.summary,locator.summarydata)
        cy.get(locator.ProceedToCheckout).eq(1).click({force:true})
        cy.completeProcess(locator.process)
        //verifyng text in payment page
        cy.verifyText(locator.summary,locator.summarydata)
        cy.PaymentOption(locator.paymentOption)
        //verifying text after completing payment
        cy.verifyText(locator.payment,locator.paymentText)
    })
})