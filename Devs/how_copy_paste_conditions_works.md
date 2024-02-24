In Bricks Builder, Bricks properties are store in Vue GlobalProperties. When you inspect element in builder, there is a data attribute 'data-v-app' on brx-body class element.

![1](https://github.com/0jscsshtml/Bricksfree/assets/80338568/8a53a11e-5145-49fc-8aae-f7ca4bc4ef65)

Long story short. Create a variable to store the Bricks globalProperties.(Google yourself vue3 instance).  
Var vueGlobal = document.querySelector('.brx-body').__vue_app__.config.globalProperties  
console.log(vueGlobal) you will see this.  

![2](https://github.com/0jscsshtml/Bricksfree/assets/80338568/451bf348-e128-4755-b6be-562ecc73b4ae)
