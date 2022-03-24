//Commands for Assignment 2
//will call baseURL
Cypress.Commands.add('A2baseURL', () => {
    cy.visit("http://automationpractice.com/index.php")
})

//"createAccount" command will enter the email and click on the button.
Cypress.Commands.add('createAccount', (locators, email) => {
    for (var property in locators) {
        property === "emailCreate" ? cy.get(locators[property]).type(email) : cy.get(locators[property]).click()
    }
})

//"fillform" command will fill all the field
Cypress.Commands.add('fillform', (formclass, formdata) => {
    for (var property in formclass) {
        property === "state" || property === "country" ? cy.get(formclass[property]).select(formdata[property])
            : cy.get(formclass[property]).type(formdata[property])
    }
    cy.get("#submitAccount").click()
})

//"verifySignin" command will verify the customer name
Cypress.Commands.add('verifySignin', (nameclass, namecust) => {
    cy.get(nameclass).should('have.text', namecust)
})

//"AddtoCart" command will add product to cart
Cypress.Commands.add('AddtoCart', (addProduct) => {
    for (var property in addProduct) {
        property === "tShirt" ? cy.get(addProduct[property]).eq(0).click({ force: true }) : cy.get(addProduct[property]).click()
    }
})

//"verifyText" command will invoke the text from object and comapre with text
Cypress.Commands.add('verifyText', (ProductLoc, ProductText) => {
    for (var property in ProductText) {
        cy.get(ProductLoc[property]).invoke('text').should('include', ProductText[property])
    }
})

//"completeProcess" command will complete the checkout process in cart
Cypress.Commands.add('completeProcess', (locator) => {
    for (var property in locator) {
        property === "checkbox" ? cy.get(locator[property]).check() : cy.get(locator[property]).click()
    }
})

//"Payment" command will click the payment method and completes the process
Cypress.Commands.add('PaymentOption', (Paymentlocator) => {
    for (var property in Paymentlocator) {
        cy.get(Paymentlocator[property]).click()
    }
})

//Commands for Assignment 1
//This command will call baseURL
Cypress.Commands.add('A1baseURL', () => {
    cy.visit("https://www.saucedemo.com/")
})

//'login' command will login with user ID and password
Cypress.Commands.add('login',(loginLocator,loginID,passwordLocator,password)=>{
    cy.get(loginLocator).type(loginID)
    cy.get(passwordLocator).type(password)
    cy.get("#login-button").click()
})

//'loginValidation' command with validate the different users login
Cypress.Commands.add('loginValidation',(locator)=>{
    for(let i=0;i<locator.data.length;i++){
        cy.login(locator.login.username,locator.data[i].loginID,
            locator.login.password,locator.data[i].password)
        cy.verifyLogin()
    }
})

//'verifyLogin' command will verify the url
Cypress.Commands.add('verifyLogin',()=>{
    cy.url().should('eq',"https://www.saucedemo.com/inventory.html")
    cy.get("#react-burger-menu-btn").click()
    cy.get("#logout_sidebar_link").click()
})

//'productToCart' command will add product to cart and will click on cart
Cypress.Commands.add('productToCart',(addToCartLocator,cartLocator)=>{
    cy.get(addToCartLocator).click()
    cy.get(cartLocator).click()
})

//'sortLowToHigh' command will sort low to high 
Cypress.Commands.add('sortLowToHigh',(filterLocator,elementLocator)=>{
    cy.get(filterLocator)
      .select(elementLocator)
})

//'removeAndVerify' command will remove the product and verify wheather it's removed
Cypress.Commands.add('removeAndVerify',(removeLocator)=>{
    cy.get(removeLocator).click()
    cy.get('.cart_list').should("not.have.class",'cart_item')
})

//'verifyProduct' command will verify the product in cart
Cypress.Commands.add('verifyProduct',(locator)=>{
    for(var property in locator.yourCart){
        cy.get(locator.yourCart[property]).contains(property==="productName"?"Sauce Labs Backpack":"29.99")
    }
})