//will call baseURL
Cypress.Commands.add('baseURL',()=>{
    cy.visit("http://automationpractice.com/index.php")
})

//"createAccount" command will enter the email and click on the button.
Cypress.Commands.add('createAccount',(locators,email)=>{
    for(var property in locators){
        property==="emailCreate"? cy.get(locators[property]).type(email) : cy.get(locators[property]).click()
    }
})

//"fillform" command will fill all the field
Cypress.Commands.add('fillform',(formclass,formdata)=>{
    for(var property in formclass){
        property==="state" || property==="country" ? cy.get(formclass[property]).select(formdata[property])
                                                   : cy.get(formclass[property]).type(formdata[property])
    }
    cy.get("#submitAccount").click()
})

//"verifySignin" command will verify the customer name
Cypress.Commands.add('verifySignin',(nameclass,namecust)=>{
    cy.get(nameclass).should('have.text', namecust)
})

//"AddtoCart" command will add product to cart
Cypress.Commands.add('AddtoCart',(addProduct)=>{
    for(var property in addProduct){
        property==="tShirt"?cy.get(addProduct[property]).eq(0).click({force: true}):cy.get(addProduct[property]).click()
    }
})

//"verifyText" command will invoke the text from object and comapre with text
Cypress.Commands.add('verifyText',(ProductLoc,ProductText)=>{
    for(var property in ProductText){
        cy.get(ProductLoc[property]).invoke('text').should('include',ProductText[property])
    }
})

//"completeProcess" command will complete the checkout process in cart
Cypress.Commands.add('completeProcess',(locator)=>{
    for(var property in locator){
        property==="checkbox"?cy.get(locator[property]).check() : cy.get(locator[property]).click()
    }
})

//"Payment" command will click the payment method and completes the process
Cypress.Commands.add('PaymentOption',(Paymentlocator)=>{
    for(var property in Paymentlocator){
        cy.get(Paymentlocator[property]).click()
    }
})