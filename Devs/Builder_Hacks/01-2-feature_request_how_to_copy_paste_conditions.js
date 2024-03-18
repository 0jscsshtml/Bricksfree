<style>
    #xx-paste-conditions.disable {
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
            var validKey            = '';
            const bricksPanel       = document.getElementById('bricks-panel-inner'), 
                  elementPanel      = document.getElementById('bricks-panel-element'),
                  structurePanel	= document.getElementById('bricks-structure'),
                  contextMenu       = document.querySelector('.brx-body > #bricks-builder-context-menu');

            // create 'Paste Conditions' button on Context Menu
            const   getIdBtn		= contextMenu.children[0].querySelector('span[data-balloon^="#brxe"]'),
			        getPasteEle 	= contextMenu.children[0].querySelector('li.sep > span.shortcut'),
                    pasteBtn        = getIdBtn.cloneNode();
            
            pasteBtn.id     		     = 'xx-paste-conditions';  
            pasteBtn.dataset.balloon     = 'Paste conditions';
            pasteBtn.dataset.balloonPos  = 'top';
            pasteBtn.classList.add('disable');
            pasteBtn.textContent = 'C';
            getPasteEle.parentElement.insertBefore(pasteBtn, getPasteEle);

            // create copy conditions button    
            function condCopyBtn() {
                const cloneTarget           = elementPanel.querySelector('.bricks-panel-controls .title-wrapper > .actions > .close'),
                      copyBtn               = cloneTarget.cloneNode(true);

                copyBtn.id                  = 'xx-copy-conditions';
                copyBtn.dataset.balloon     = 'Copy conditions';
                copyBtn.dataset.balloonPos  = 'bottom-right';
                copyBtn.children[0].innerHTML   = '';
				copyBtn.children[0].innerHTML   = '<svg></svg>'; // copy bricks 'duplicate' svg and paste here

                return copyBtn;
            };

            function mainPanelEvents(event) {  
                if (event.type === 'mousedown' && event.isTrusted) {  
                    const targetEle = event.target;  

                    // when toggle on conditions, call function to create button and append
                    if ( targetEle.closest('li.conditions') && !targetEle.closest('li.conditions.active') ) {
                        setTimeout(() => {
                            const condCopyBtnEle = condCopyBtn();
							elementPanel.querySelector('.bricks-panel-controls .title-wrapper > .actions').append(condCopyBtnEle);
                        }, 235);
                    }  
			
					// when click on copy conditions, call function to get current element conditions object and write to clipboard
                    if ( targetEle.closest('#xx-copy-conditions') ) {  
                        const activeEleObj = vueGlobal.$_getElementObject(vueGlobal.$_state.activeId)?.settings?._conditions;

                        if (activeEleObj) {
                            validKey = activeEleObj[0][0]['id'];
                            vueGlobal.$_copyToClipboard(JSON.stringify(activeEleObj), "Conditions Copied");
                        } else {
                            vueGlobal.$_showMessage("No conditions defined, copy aborted.");
                        }
                    }  
                }  
            };
            
            function contextMenuEvents(event) {  
                if ( event.type === 'mousedown' && event.isTrusted ) {		
                    const targetEle = event.target; 

                    // when click on paste condition, call function to get clipboard data and update current element object
                    if ( targetEle.id === 'xx-paste-conditions' ) {
                        vueGlobal.$_readFromClipboard().then((clipboardData) => {
                            const copiedObj = clipboardData;
                            
                            if ( copiedObj[0][0]['id'] === validKey ) {
                                // feed chatgpt with right context to help to change all ids
                                const updatedArray = copiedObj.map(subArray =>
                                    subArray.map(obj => ({
                                        ...obj,
                                        id: vueGlobal.$_generateId()
                                    }))
                                );
                                vueGlobal.$_state.activeElement.settings['_conditions'] = {};
                                vueGlobal.$_state.activeElement.settings['_conditions'] = updatedArray;
                                vueGlobal.$_showMessage('Conditions object pasted');
                            } else {
                                vueGlobal.$_showMessage("Invalid object, paste aborted.");
                            }
                        })
                    }
                }
            };

            function structurePanelEvents(event) {  
                if ( event.type === 'contextmenu' && event.isTrusted ) {	
                    setTimeout(() => {	
					    const targetId = vueGlobal.$_state.showContextMenu;
					    if ( targetId ) {
						    contextMenuAction(targetId);	
					    }
				    }, 2);
				
				    function contextMenuAction(targetId) {	
					    if ( validKey === '' ) {
						    document.getElementById('xx-paste-conditions').classList.add('disable');
					    } else {
						    document.getElementById('xx-paste-conditions').classList.remove('disable');
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
