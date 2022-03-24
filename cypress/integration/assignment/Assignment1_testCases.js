/// <reference types="cypress" />
describe("sauce Lab",()=>{
    let locator
    beforeEach(function(){
       cy.A1baseURL()
       //loading locators data
        cy.fixture("locatorsA1.json").then((locators)=>{
            locator = locators
            return locator
        })
    })

    //validating the login with different users
    it("Login validation", () =>{
        cy.loginValidation(locator)    
    })

    //Adding product to cart and verfying added product
    it("Add product", ()=>{
        cy.login(locator.login.username,locator.loginData.username,
            locator.login.password,locator.loginData.password)
        cy.productToCart(locator.productPage.addTocart,locator.productPage.cart)
        cy.verifyProduct(locator)
    })

    //sorting product with low to high price, add to cart and remove the product
    it("Sort price Low TO High, Remove the item from cart", ()=>{
        cy.login(locator.login.username,locator.loginData.username,
            locator.login.password,locator.loginData.password)
        cy.sortLowToHigh(locator.productPage.filter,locator.productPage.elements[2])
        cy.productToCart(locator.productPage.addTocart,locator.productPage.cart)
        cy.removeAndVerify(locator.remove)
    })
})