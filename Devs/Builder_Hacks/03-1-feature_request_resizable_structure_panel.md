https://github.com/0jscsshtml/Bricksfree/assets/80338568/3f02050a-f761-4b88-8e51-28b3a8e32d5c

Why Bricks left panel is resizable but not Structure Panel? Let's inspect the element and see what's the differences.

![Screenshot 2024-03-09 195524](https://github.com/0jscsshtml/Bricksfree/assets/80338568/522ddd84-7ff9-4901-bfc8-c015ca283945)

As you can see, there is a draggable element '#bricks-panel-resizable' at left panel. This element is hidden and visible on hover. When you drag this element, another class 'resizing-panel' is added on '#bricks-preview'. This class set the '#bricks-preview' element to pointer-events none, so that when you drag draggable element and if pointer out of this element, it won't interrupt the dragging. Pay attention to this '#bricks-preview' element, there is inline style margin-right 300px(default width of Structure Panel), when we implement resizable on Structure Panel, we need to update this with the current width of Structure Panel. Bricks will calculate Canvas scale ratio automatically at Breakpoints toolbar with the width of left panel and Structure panel. Lastly, you will wondering how to save the current size of Structure Panel so that when builder reload, it will remember the last size of Structure Panel. Solution is localStorage to store the current width of Structure Panel.

The rest is how to make element draggable, feed the context to chatgpt, adjust accordingly.  
Full code can be found in same directory.
