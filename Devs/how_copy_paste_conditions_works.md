In Bricks Builder, Bricks properties are store in Vue GlobalProperties. When you inspect element in builder, there is a data attribute 'data-v-app' on brx-body class element.

![1](https://github.com/0jscsshtml/Bricksfree/assets/80338568/8a53a11e-5145-49fc-8aae-f7ca4bc4ef65)

Long story short. Create a variable to store the Bricks globalProperties.(Google yourself vue3 instance).  
Var vueGlobal = document.querySelector('.brx-body').\_\_vue_app__.config.globalProperties  
console.log(vueGlobal) you will see this.  

![2](https://github.com/0jscsshtml/Bricksfree/assets/80338568/451bf348-e128-4755-b6be-562ecc73b4ae)

First thing first, you need a call button to trigger the copy action event. Here a little bit tricky, depend on where you wanna put this button in the DOM, due to the Conditions & Interactions panel are render only when either panel is active, you may need to use either setTimeout() or mutation.observe(maybe there is a better way that can access Vue component and add this button element to template instead of this method, still learning.) to wait for the DOM ready and regenerate this button every time the panel is active. Assume that you wanna put it next to the Conditions panel 'Close' button, make sure your code recall back the function to generate the Copy button when you toggle on at Conditions button. Tips: clone the 'Close' button, replace inner svg(copy from any Bricks copy svg), replace data-balloon attribute to 'Copy Conditions', replace data-balloon-pos to 'bottom-right' and append this Copy button. This way the Bricks builder tooltips and button css will work for your new Copy button.
