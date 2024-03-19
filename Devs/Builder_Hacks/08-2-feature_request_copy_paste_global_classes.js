<style>
    #xx-copy-global-class.disable, #xx-paste-global-class.disable {
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
            const 	contextMenu     = document.querySelector('.brx-body > #bricks-builder-context-menu'),
					structurePanel	= document.getElementById('bricks-structure');

            // create 'Copy' & 'Paste' global class buttons on Context Menu
            const getIdBtn		= contextMenu.children[0].querySelector('span[data-balloon^="#brxe"]');	
			const getPasteEle 	= contextMenu.children[0].querySelector('li.sep > span.shortcut');

			function createAttrBtn(balloon, id) {
				const copyPasteAttrBtn	= getIdBtn.cloneNode();
				copyPasteAttrBtn.dataset.balloon = balloon;
				copyPasteAttrBtn.id = id;
				copyPasteAttrBtn.classList.add('disable');
				copyPasteAttrBtn.textContent = 'GC';
				return copyPasteAttrBtn;
			};

			const copyClsBtn = createAttrBtn('Copy global classes', 'xx-copy-global-class');
			getIdBtn.parentElement.insertBefore(copyClsBtn, getIdBtn);
			const pasteClsBtn = createAttrBtn('Paste global classes', 'xx-paste-global-class');
			getPasteEle.parentElement.insertBefore(pasteClsBtn, getPasteEle);

			function contextMenuEvents(event) {  
                if ( event.type === 'mousedown' && event.isTrusted === true ) {	
                    const targetEle = event.target;

                    // copy active element global class array
                    if ( targetEle.id === 'xx-copy-global-class' ) {
                        event.stopImmediatePropagation();
                        if ( vueGlobal.$_state.activeElement.settings.hasOwnProperty('_cssGlobalClasses') ) {
                            validKey = vueGlobal.$_state.activeElement.settings._cssGlobalClasses[0];
                            vueGlobal.$_copyToClipboard(JSON.stringify(vueGlobal.$_getElementObject(vueGlobal.$_state.activeId).settings._cssGlobalClasses), "Global classes Copied");
                            vueGlobal.$_state.showContextMenu = false;
                        } else {
                            vueGlobal.$_showMessage('No global class defined, copy aborted');
                        }
                    }
                    
                    // paste global class array on new element
                    if ( targetEle.id === 'xx-paste-global-class' ) {
                        event.stopImmediatePropagation();
                        vueGlobal.$_readFromClipboard().then((clipboardData) => {
                            const copiedObj 		= clipboardData,
                                copiedObjValKey 	= clipboardData[0];
                            
                            if ( copiedObjValKey === validKey ) {
								const activeEleObj =  vueGlobal.$_state.activeElement.settings['_cssGlobalClasses'];
								if (!activeEleObj) {					
									vueGlobal.$_state.activeElement.settings['_cssGlobalClasses'] = copiedObj;
								} else {
									const combinedArray = [...new Set([...vueGlobal.$_state.activeElement.settings['_cssGlobalClasses'], ...copiedObj])];
									vueGlobal.$_state.activeElement.settings['_cssGlobalClasses'] = combinedArray;
								}	
								vueGlobal.$_showMessage(`Global classes pasted`);
                            } else {
                                vueGlobal.$_showMessage(`Invalid global class object, paste aborted`);
                            }
                        });
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
					    if ( !vueGlobal.$_state.activeElement.settings.hasOwnProperty('_cssGlobalClasses') ) {
						    document.getElementById('xx-copy-global-class').classList.add('disable');
					    } else {
						    document.getElementById('xx-copy-global-class').classList.remove('disable');
					    }
					    if ( validKey === '' ) {
						    document.getElementById('xx-paste-global-class').classList.add('disable');
					    } else {
						    document.getElementById('xx-paste-global-class').classList.remove('disable');
					    }
                    }    
                }
			}

            contextMenu.addEventListener('mousedown', contextMenuEvents);
			structurePanel.addEventListener('contextmenu', structurePanelEvents);
        };
    })
</script>
