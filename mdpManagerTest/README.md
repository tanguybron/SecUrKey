ToDo :
- Complete Templates
- Gestion des Cookies
- Add Account 
- Research Bar


Figma Mockup : https://www.figma.com/file/OfFoygX4mveoUvWu0yLGRW/Gestionnaire-MDP?node-id=0%3A1&t=Nrlzhu0X12f7TmdR-1

Website Map : 

```mermaid
graph TD;
    Landing-->Join;
    Landing-->SignIn;
    Join-->Passwords;
    SignIn-->Passwords;
    Passwords-->Password;
    Passwords-->Profile;
    Passwords-->Add;
    Password-->Edit;
```

Page dependencies : 

```mermaid
graph TD;
    Landing-->Style_css;
    Landing-->Components_css;
    Join-->Components_css;
    Join-->Form_css;
    SignIn-->Components_css;
    SignIn-->Form_css;
    Passwords-->Components_css;
    Passwords-->Dashboard_css;
    Passwords-->Passwords_css;
    Profile-->Profile;
    Add-->Components_css;
    Add-->Dashboard_css;
    Add-->Add_css;
    Password-->Dashboard_css;
    Password-->Components_css;
    Password-->Password_css;
    Edit-->Dashboard_css;
    Edit-->Components_css;
    Edit-->Password_css;
```

Issues : 
- Get Started Button, Landing Page
