# Bricksfree
* Bricks builder plugin.
* Plugin Option page to enable/disable Bricksfree features. Import/export Option Page settings. Remove wp_options row created by Bricksfree after uninstall.

https://github.com/0jscsshtml/Bricksfree/assets/80338568/15879f4b-6c28-4037-ba88-8ab570ef2019

https://github.com/0jscsshtml/Bricksfree/assets/80338568/0af0514c-fac0-4663-a2f9-c9f3ea3fd79e

Bricks is build on Vue, and Bricks provide/store the data globally with Vue globalProperties. All additonal features/function you want to build mainly is getting and setting from this data, the rest is just JS/CSS/HTML for front end interactions. Anyone can build extra features on top of Bricks provided you know how to get access to the Bricks properties. Well, sadly, you hardly can found real devs will talk and share about this.(go and check in Bricks forum).

With abit of time of element inspection, test and try how Bricks Vue method/constructor work, you can add any extra features/functions on Bricks. This AT 1:1 mockup inspired from the great God coder, just for learning purpose, will not release nor commercialize. Stay calm buddy, no one steal your hard work. With the god of mother coder ChatGPT, now is much more easy then few years ago. 

Now how all this underlying thing work?. Maybe I will put some tutorial on how all this works.


# Builder Tweaks (All assets JS & CSS loaded in Builder only )
1) Preview Colors on hover ( support color control, except style group shape divider and gradient(may look into it later) );
2) Disable PIN Icon on the elements categories list.
3) Grid Columns, Expand/Collapse and Slim Mode on the elements categories list.
4) Always show “View on frontend” button.
5) Hide any element from structure panel.( ID or Class support)
6) Increase builder’s inputs and Spacing Controls size.
7) Auto-select Import Images in the Template popup.
8) X-mode. ( Builder & Preview )
9) Pseudo-elements(:hover, :active, :focus, :before, :after) and Parent Element shortcuts.
10) Element Style Tab Groups Shortcuts.
11) New Elements shortcuts and draggable Structure Panel on structure panel.
12) Change Builder Icon/Logo.
13) Change Builder Preloader background color.
14) Custom Builder Save Message.
15) Highlight Nestable Elements at Structure Panel.
16) Highlight All Parent Elements of current Active Element at Structure Panel.
17) Disable the outline border of the active element when styling Borders and Box-shadow.
18) Change Active Element outline color in Canvas.
19) Locked Class Indicator
    * Indicate Global Class Lock/Unlock Status on Global Class Popup Control and Element Classes List.
20) Class Preview on hover
    * Hover any "Other Classes" at Global Class Popup Control to preview the Class styling
21) Reveal “Class Icons” on hover and focus.
22) Expand All Children Elements.
    * Click on any root parent wrapper/container to expand all direct childrens in Structure Panel.
23) Tag Manager in Structure Panel.
24) Delete Wrappers & Move Children Up
25) Basic text / Rich text / Heading converter
26) Grid Guides
27) Custom default settings for relevant elements( basic text - 'p', image - 'no-caption')
28) Copy paste Conditions / Interactions to any elements on structure panel.
29) Clone active global class and add in to global classes list. Clone class name editable before clone.
