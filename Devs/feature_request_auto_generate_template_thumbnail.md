
https://github.com/0jscsshtml/Bricksfree/assets/80338568/51f919a8-89ae-4e8d-bcc9-16f5583b10f2

1) First thing come to mind is screenshot the active element at Canvas. Google it, article from great dev Vincy(Phppot), html2canvas.js solve it.
2) Then how do I get the newly created template ID so that i can assign the screenshot as the post feature image. Though Class file of templates.php provided static
   method to get all template ids, but I opted for wp hook.
3) This only apply on Structure Panel context menu, not Canvas context menu, because in Canvas, you can't target the wrapper of some editable/nestable elements
   (though you can use js to get the wrapper, but in this moment I'm not focus on this.).

Now after gathered all info needed, let's see what we can do. First thing first, the templates popup only render in DOM when you click 'save as template' on
Structure Panel context menu, so either you use setTimeout() or mutationObserver to wait for templates popup ready. Once template popup loaded, we get the node  
'bricks-layout-wrapper', save button and active element id ready for later process.  

Once all input fields are filled in and you click "Save as template" button, html2canvas will take the screenshot of active element on Canvas, ajax call backend
function to process ajax imaga data, upload image to media library, get latest template Id, assign uploaded image to template as feature image. Get ajax
response, prepend img element to 'bricks-layout-wrapper'.

If the thumbnail is long content, hover on it will scroll down to image bottom.

Full code in same directory.(I assume you know how to enqueue file and put script in function.php)
