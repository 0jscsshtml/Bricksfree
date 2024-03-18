<style>
    #xx-copy-attribute.disable, #xx-paste-attribute.disable {
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

            // create 'Copy' & 'Paste' Attributes button on Context Menu
            const getIdBtn		= contextMenu.children[0].querySelector('span[data-balloon^="#brxe"]');	
			const getPasteEle 	= contextMenu.children[0].querySelector('li.sep > span.shortcut');

			function createAttrBtn(balloon, id) {
				const copyAttrBtn	= getIdBtn.cloneNode();
				copyAttrBtn.dataset.balloon = balloon;
				copyAttrBtn.id = id;
				copyAttrBtn.classList.add('disable');
				copyAttrBtn.textContent = 'A';
				return copyAttrBtn;
			};

			const copyAttrBtn = createAttrBtn('Copy Attribute', 'xx-copy-attribute');
			getIdBtn.parentElement.insertBefore(copyAttrBtn, getIdBtn);
			const pasteAttrBtn = createAttrBtn('Paste Attribute', 'xx-paste-attribute');
			getPasteEle.parentElement.insertBefore(pasteAttrBtn, getPasteEle);

            function structurePanelEvents() {
				setTimeout(() => {	
					const targetId = vueGlobal.$_state.showContextMenu;
					if ( targetId ) {
						contextMenuAction(targetId);	
					}
				}, 2);
				
				function contextMenuAction(targetId) {	
					if ( !vueGlobal.$_state.activeElement.settings.hasOwnProperty('_attributes') ) {
						document.getElementById('xx-copy-attribute').classList.add('disable');
					} else {
						document.getElementById('xx-copy-attribute').classList.remove('disable');
					}
					if ( validKey === '' ) {
						document.getElementById('xx-paste-attribute').classList.add('disable');
					} else {
						document.getElementById('xx-paste-attribute').classList.remove('disable');
					}
				}
			}
			
			function contextMenuEvents(event) {  
                if ( event.type === 'mousedown' && event.isTrusted === true ) {	
                    const targetEle = event.target;

                    // copy active element attribute object
                    if ( targetEle.id === 'xx-copy-attribute' ) {
                        event.stopImmediatePropagation();
                        if ( vueGlobal.$_state.activeElement.settings.hasOwnProperty('_attributes') ) {
                            validKey = vueGlobal.$_state.activeElement.settings._attributes[0]['id'];
                            vueGlobal.$_copyToClipboard(JSON.stringify(vueGlobal.$_getElementObject(vueGlobal.$_state.activeId).settings._attributes), `Attributes Copied`);
                            vueGlobal.$_state.showContextMenu = false;
                        } else {
                            vueGlobal.$_showMessage('No attributes defined, copy aborted');
                        }
                    }
                    
                    // paste attribute object on new element
                    if ( targetEle.id === 'xx-paste-attribute' ) {
                        event.stopImmediatePropagation();
                        vueGlobal.$_readFromClipboard().then((clipboardData) => {
                            const copiedObj 		= clipboardData,
                                copiedObjValKey 	= clipboardData[0]['id'];
                            
                            if ( copiedObjValKey === validKey ) {
                                var updatedArray = copiedObj.map(item => {
                                    return {
                                        ...item,
                                        "id": vueGlobal.$_generateId()
                                    };
                                });
                                vueGlobal.$_state.activeElement.settings['_attributes'] = {};
                                vueGlobal.$_state.activeElement.settings['_attributes'] = updatedArray;
                                vueGlobal.$_showMessage(`Attributes object pasted`);							
                            } else {
                                vueGlobal.$_showMessage(`Invalid attributes object, paste aborted`);
                            }
                        });
                    }
                }
            };

            contextMenu.addEventListener('mousedown', contextMenuEvents);
			structurePanel.addEventListener('contextmenu', structurePanelEvents);
        };
    })
</script>
