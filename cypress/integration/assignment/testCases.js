/// <reference types="cypress" />
describe("Automation Practice",()=>{
    let locator
    let random=Math.random()
    let email = `hehe${random}@gmail.com`
    before(()=>{
        cy.visit("http://automationpractice.com/index.php")
        cy.fixture("locators.json").then((locatorsA4)=>{
            locator = locatorsA4
            return locator
        })
    
    })

    //will create a account in automation practice website
    it("Signup",()=>{
        cy.createAccount(locator.createAaccount,email)
        cy.wait(4000)
        cy.fillform(locator.form,locator.data) 
        let customerName = locator.data["firstname"]+" "+locator.data["lastname"]
        cy.verifySignin(locator.name,customerName)  
    })

    //product will add to cart and verify the added product
    it("AddtoCart & verifyProduct ",()=>{
        cy.AddtoCart(locator.addtoCart)
        cy.wait(4000)
        for(let i=0;i<locator.productLoc.length;i++){
            cy.verifyText(locator.productLoc[i],locator.ProductText[i])
        }
        cy.get(locator.checkout).click()
    })

    //will verify and complete the summary and payment process
    it("Summary",()=>{
        for(let i=0;i<locator.summary.length;i++){
            cy.verifyText(locator.summary[i],locator.summarydata[i])
        }
        cy.get(locator.ProceedToCheckout).eq(1).click({force:true})
        cy.completeProcess(locator.process)
        for(let i=0;i<locator.summary.length;i++){
            cy.verifyText(locator.summary[i],locator.summarydata[i])
        }
        cy.Payment(locator.payment)
        cy.verifyText(locator.sucess_message,locator.message)
    })
})