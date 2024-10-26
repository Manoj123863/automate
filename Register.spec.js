const {test,expect}=require('@playwright/test')
import { Registerpage } from '../pages/pages'
import { wait } from '../utility/wait'


//Validate Registering an Account by providing only the Mandatory fields
test('register@1',async({page})=>{
    const Reg = new Registerpage(page)
    await Reg.navigatetoHomepage()
    await Reg.navigatetoRegisterpage()
    const Firstname=Reg.generateRandomFirstname()
    const Lastname=Reg.generateRandomLastname()
    const Email=Reg.generateRandomEmail()
    const Password=Reg.generateRandomPassword(8)
    await Reg.register(Firstname,Lastname,Email,Password,false,true)
    await Reg.isRegistrationSuccessful()
    await Reg.ishomepage()
    await page.waitForTimeout(5000)
})

//Validate Registering an Account by providing all the fields
test('register@3',async({page})=>{
    const Reg = new Registerpage(page)
    await Reg.navigatetoHomepage()
    await Reg.navigatetoRegisterpage()
    const Firstname=Reg.generateRandomFirstname()
    const Lastname=Reg.generateRandomLastname()
    const Email=Reg.generateRandomEmail()
    const Password=Reg.generateRandomPassword(8)
    await Reg.register(Firstname,Lastname,Email,Password,true,true)
    await Reg.isRegistrationSuccessful()
    await Reg.ishomepage()
    await page.waitForTimeout(5000)
})

//Validate proper notification messages are displayed for the mandatory fields, when you don't provide any fields in the 'Register Account' page and submit
test('register@4',async({page})=>{
    const Reg = new Registerpage(page)
    await Reg.navigatetoHomepage()
    await Reg.navigatetoRegisterpage()
    await Reg.register('','','','',false,false)
    const locmessages=["//div[@id='error-firstname']","//div[@id='error-lastname']","//div[@id='error-email']","//div[@id='error-password']"]
    for(const messagelocator of locmessages){
        const messageelement=page.locator(messagelocator)
        await messageelement.waitFor({ state: 'visible' });
        const message=await messageelement.textContent()
        console.log(message)
    }
    await Reg.isRegistrationSuccessful()
})

//Validate Registering an Account when 'Yes' option is selected for Newsletter field
test('register@5',async({page})=>{
    const Reg = new Registerpage(page)
    const ass = new wait(page)
    await Reg.navigatetoHomepage()
    await Reg.navigatetoRegisterpage()
    const Firstname=Reg.generateRandomFirstname()
    const Lastname=Reg.generateRandomLastname()
    const Email=Reg.generateRandomEmail()
    const Password=Reg.generateRandomPassword(8)
    await Reg.register(Firstname,Lastname,Email,Password,true,true)
    await Reg.isRegistrationSuccessful()
    await Reg.ishomepage()
    await page.locator("//a[normalize-space()='Subscribe / unsubscribe to newsletter']").click()
    await expect(page.locator("(//input[@id='input-newsletter'])[1]")).toBeChecked()
    await page.waitForTimeout(5000)
})

//Validate Registering an Account when 'No' option is selected for Newsletter field
test('register@6',async({page})=>{
    const Reg = new Registerpage(page)
    const ass = new wait(page)
    await Reg.navigatetoHomepage()
    await Reg.navigatetoRegisterpage()
    const Firstname=Reg.generateRandomFirstname()
    const Lastname=Reg.generateRandomLastname()
    const Email=Reg.generateRandomEmail()
    const Password=Reg.generateRandomPassword(8)
    await Reg.register(Firstname,Lastname,Email,Password,false,true)
    await Reg.isRegistrationSuccessful()
    await Reg.ishomepage()
    await page.locator("//a[normalize-space()='Subscribe / unsubscribe to newsletter']").click()
    await expect(page.locator("(//input[@id='input-newsletter'])[1]")).not.toBeChecked()
    await page.waitForTimeout(5000)
})

//Validate Registering an Account by providing the existing account details (i.e. existing email address)
test('register@9',async({page})=>{
    const Reg = new Registerpage(page)
    const ass = new wait(page)
    await Reg.navigatetoHomepage()
    await Reg.navigatetoRegisterpage()
    const Firstname=Reg.generateRandomFirstname()
    const Lastname=Reg.generateRandomLastname()
    const Email='admin@gmail.com'
    const Password=Reg.generateRandomPassword(8)
    await Reg.register(Firstname,Lastname,Email,Password,false,true)
    await Reg.isRegistrationSuccessful()
    
    await page.waitForTimeout(5000)
})


