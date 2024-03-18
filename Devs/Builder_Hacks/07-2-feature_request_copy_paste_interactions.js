
<style>
    #xx-paste-interactions.disable {
        pointer-events: none;
        opacity: 0.35;
    }
</style>


<script>
    window.addEventListener("load", () => {
        // get Bricks vue properties
        var vueGlobal   = document.querySelector('.brx-body').__vue_app__.config.globalProperties;

        // if user has full access to Builder
        if ( vueGlobal.$_state.fullAccess ) {
            var validKey            = '',
                activeClassId       = '',
                copyObjType         = '';

            const bricksPanel       = document.getElementById('bricks-panel-inner'), 
                  elementPanel      = document.getElementById('bricks-panel-element'),
                  structurePanel	= document.getElementById('bricks-structure'),
                  contextMenu       = document.querySelector('.brx-body > #bricks-builder-context-menu');

            // create 'Paste Interactions' button on Context Menu
            const   getIdBtn		= contextMenu.children[0].querySelector('span[data-balloon^="#brxe"]'),
			        getPasteEle 	= contextMenu.children[0].querySelector('li.sep > span.shortcut'),
                    pasteBtn        = getIdBtn.cloneNode();
            
            pasteBtn.id     		     = 'xx-paste-interactions';  
            pasteBtn.dataset.balloon     = 'Paste interactions';
            pasteBtn.dataset.balloonPos  = 'top';
            pasteBtn.classList.add('disable');
            pasteBtn.textContent = 'I';
            getPasteEle.parentElement.insertBefore(pasteBtn, getPasteEle);

            // create copy interactions button    
            function interactCopyBtn() {
                const cloneTarget           = elementPanel.querySelector('.bricks-panel-controls .title-wrapper > .actions > .close'),
                      copyBtn               = cloneTarget.cloneNode(true);

                copyBtn.id                  = 'xx-copy-interactions';
                copyBtn.dataset.balloon     = 'Copy interactions';
                copyBtn.dataset.balloonPos  = 'bottom-right';
                copyBtn.children[0].children[0].innerHTML   = '<svg></svg>'; // copy bricks 'duplicate' svg and paste here

                return copyBtn;
            };

            function mainPanelEvents(event) {  
                if (event.type === 'mousedown' && event.isTrusted) {  
                    const targetEle = event.target;  

                    // when toggle on interactions, call function to create button and append
                    if ( targetEle.closest('li.interactions') && !targetEle.closest('li.interactions.active') ) {
                        setTimeout(() => {
                            const interactCopyBtnEle = interactCopyBtn();
							elementPanel.querySelector('.bricks-panel-controls .title-wrapper > .actions').append(interactCopyBtnEle);
                        }, 235);
                    }

                    // when click on copy interaction button, check if global class is active, if active, copy paste to class object, else to element object
                    if ( targetEle.closest('#xx-copy-interactions') ) {  

                        // no active class, copy paste interactions on element
                        if ( (!vueGlobal.$_state.activeClass || Object.keys(vueGlobal.$_state.activeClass).length === 0 ) && vueGlobal.$_state.activeElement.settings.hasOwnProperty('_interactions') ) {
                            validKey = vueGlobal.$_state.activeElement.settings['_interactions'][0]['id'];
                            copyObjType = 'element';
                            vueGlobal.$_copyToClipboard(JSON.stringify(vueGlobal.$_getElementObject(vueGlobal.$_state.activeId).settings['_interactions']), 'Interactions Copied');
                        }
                        
                        // global class active, copy paste interactions on class
                        else if ( vueGlobal.$_state.activeClass && Object.keys(vueGlobal.$_state.activeClass).length && vueGlobal.$_state.activeClass.settings.hasOwnProperty('_interactions') ) {
                            validKey = vueGlobal.$_state.activeClass.settings['_interactions'][0]['id'];
                            copyObjType = 'class';
                            activeClassId = vueGlobal.$_state.activeClass.id;
                            vueGlobal.$_copyToClipboard(JSON.stringify(vueGlobal.$_getGlobalClass(vueGlobal.$_state.activeClass.id).settings['_interactions']), 'Class Interactions Copied');
                        
                        } else {
                            vueGlobal.$_showMessage("Invalid object, copy aborted.");
                        }
                    }  
                }  
            };
            
            function contextMenuEvents(event) {  
                if ( event.type === 'mousedown' && event.isTrusted ) {		
                    const targetEle = event.target; 

                    // when click on paste interactions, call function to get clipboard data and update current element/class object
                    if ( targetEle.id === 'xx-paste-interactions' ) {
                        vueGlobal.$_readFromClipboard().then((clipboardData) => {
                            const copiedObj = clipboardData;
                            
                            if ( copiedObj[0]['id'] === validKey ) {
                                // feed chatgpt with right context to help to change all ids
                                var updatedArray = copiedObj.map(item => {
                                    return {
                                        ...item,
                                        "id": vueGlobal.$_generateId()
                                    };
                                });

                                if ( copyObjType === 'element' ) {
                                    vueGlobal.$_state.activeElement.settings['_interactions'] = [];
                                    vueGlobal.$_state.activeElement.settings['_interactions'] = updatedArray;
                                    vueGlobal.$_showMessage('Element interactions object pasted');
                                } else if ( copyObjType === 'class' ) {
                                    if ( vueGlobal.$_state.activeElement.settings.hasOwnProperty('_cssGlobalClasses') && !vueGlobal.$_state.activeElement.settings._cssGlobalClasses.includes(activeClassId) ) {
                                        vueGlobal.$_state.activeElement.settings._cssGlobalClasses.push(activeClassId);
                                    } else {
                                        vueGlobal.$_state.activeElement.settings['_cssGlobalClasses'] = [activeClassId];
                                    }
                                    vueGlobal.$_showMessage('Class Interactione object pasted');
                                }
                            } else {
                                vueGlobal.$_showMessage('Invalid object, paste aborted.');
                            }
                        })
                    }
                }
            };
			
			// structure panel context menu open event
            function structurePanelEvents() {
                if ( event.type === 'contextmenu' && event.isTrusted === true ) {
				    setTimeout(() => {	
					    const targetId = vueGlobal.$_state.showContextMenu;
					    if ( targetId ) {
						    contextMenuAction(targetId);	
					    }
				    }, 2);
				
				    function contextMenuAction(targetId) {	
					    if ( validKey === '' ) {
						    document.getElementById('xx-paste-interactions').classList.add('disable');
					    } else {
						    document.getElementById('xx-paste-interactions').classList.remove('disable');
					    }
                    }    
                }
			}

            bricksPanel.addEventListener('mousedown', mainPanelEvents);
            contextMenu.addEventListener('mousedown', contextMenuEvents);
			structurePanel.addEventListener('contextmenu', structurePanelEvents);
        };
    })
</script>
