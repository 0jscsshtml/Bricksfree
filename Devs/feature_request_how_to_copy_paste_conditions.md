https://github.com/0jscsshtml/Bricksfree/assets/80338568/597f8351-4d68-4e75-aaf5-bc69a4a0e610

In Bricks Builder, Bricks properties are store in Vue GlobalProperties. When you inspect element in builder, there is a data attribute 'data-v-app' on brx-body class element.

![1](https://github.com/0jscsshtml/Bricksfree/assets/80338568/8a53a11e-5145-49fc-8aae-f7ca4bc4ef65)

Long story short. Create a variable to store the Bricks globalProperties.(Google yourself vue3 instance).  
var vueGlobal = document.querySelector('.brx-body').\_\_vue_app__.config.globalProperties;  

console.log(vueGlobal) you will see this.  

![2](https://github.com/0jscsshtml/Bricksfree/assets/80338568/451bf348-e128-4755-b6be-562ecc73b4ae)

First thing first, all user interactions in Builder, you need JS to capture the events. Here a little bit tricky, Bricks is build on Vue and rendering Node(add/remove) dynamically. You need to choose the Node that persistence in the DOM and ancestor of your target element to attach the event listener. For left panel in the Builder, it is safe to attach the event listener on ancestor #bricks-panel-inner. 

![3](https://github.com/0jscsshtml/Bricksfree/assets/80338568/b4c95a61-3e09-4f1f-b402-a4f365f0fa70)

For this copy conditions feature, when you inspect in the DOM, the conditions Node is not in the DOM yet, the node only rendered in the DOM when you toggle on the element conditions button. So take note of this.

Now you need a call button to trigger the copy action event. Assume that you wanna put it next to the Conditions panel 'Close' button, you may need to use either setTimeout() or mutation.observe(maybe there is a better way that can access Vue component and add this button element to template instead of this method, still learning.) to wait for the DOM ready and recall the function to regenerate the Copy button whenever you toggle on element Conditions button. 
(Tips: clone the 'Close' button, add the id 'xx-copy-conditions', replace inner svg(inspect element and copy the Bricks 'copy/duplicate' svg), replace data-balloon attribute to 'Copy Conditions', replace data-balloon-pos to 'bottom-right' and append this Copy button. This way your Copy Conditions button will inherit Bricks tooltips and button CSS.)

Now Copy button is ready, we already had event listener attached on ancestor node #bricks-panel-inner, now we concentrate on what thing we need to copy to clipboard. Refer back to image 2, in VueGlobal, there are two method/constructor we needed, call $_getElementObject(arg1) and $_copyToClipboard(arg1, arg2). For $_getElementObject(arg1), arg1 is the active element id. Where to get active element id? In vueGlobal.$_state.activeId, this will return you the active element id. The complete code to get the active element object and store to variable activeEleObj:-  

const activeEleObj = vueGlobal.$_getElementObject(vueGlobal.$_state.activeId).settings._conditions;

console.log(activeEleObj) you will get the object like below.(take note of each object id) 

![1](https://github.com/0jscsshtml/Bricksfree/assets/80338568/5e03cfef-c273-483e-acb2-faa4a4455392)

Now we had the object activeEleObj, then we use $_copyToClipboard(arg1, arg2) to copy to clipboard. arg1 is json stringify of activeEleObj, arg2 is just a string to show the message. In order for object validation when the time for paste action, I just take the first object id as validation key, you may do whatever you want as you deem fit. Code below:  

validKey = activeEleObj[0][0]['id'];  
vueGlobal.$_copyToClipboard(JSON.stringify(activeEleObj), "Conditions Copied");

Now the object should be copied to clipboard already and you can test to paste it on any text editor.

All the copy action is done now, now paste action turn. You need to create another button for paste action. Assume that you want to create it at Structure Panel Context Menu, since the Context Menu Node is rendered and remain in the DOM, you just need to create once and append it to Context Menu.
(Tips: clone the 'Delete' list element from Context Menu, remove class name delete, add id xx-paste-conditions, replace textContent to 'Paste Conditions', insert before Duplicate. This
'Paste Conditions' list element will inherit from Builder CSS.)  

Once 'Paste Condition' element created on Context Menu, you need JS to capture this element event. Attach mousedown event listener on Context Menu. 
Now how to read the clipboard object? You will need another method/function call $_readFromClipboard() in vueGlobal. This method is a promise object, code to get clipboard data as below:

vueGlobal.$_readFromClipboard().then((clipboardData) => {  
  /*** code here ***/  
});  

We need to verify whether this is the object we needed before we paste on new element, create a variable to store the clipboard data.  
const copiedObj = clipboardData;  
if ( copiedObj[0][0]['id] === validKey ) {  
  /*** code here ***/  
  }  

if validation passed, we can't just paste the object yet, every conditions object must has a unique id, so we need to change all the ids value before paste on the new element. We use the provided method $_generateId() in vueGlobal and iterate through the nested copiedObj id and change it.  

const updatedArray = copiedObj.map(subArray =>  
  subArray.map(obj => ({  
    ...obj,  
    id: vueGlobal.$_generateId()  
    }))  
    );  

After changed the ids, now get the current element object and update it with this conditions object.  
vueGlobal.$_state.activeElement.settings['_conditions'] = {};  
vueGlobal.$_state.activeElement.settings['_conditions'] = updatedArray;  
vueGlobal.$_showMessage('Conditions object pasted');

Thats it. You can find the whole code in js file.
